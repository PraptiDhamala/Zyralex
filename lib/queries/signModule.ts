// lib/queries/signModule.ts

import { supabase } from '@/lib/supabase';
import type { Lesson, Level, SignItem } from '@/types/lesson';

const MODULE = 'sign' as const;
const DEFAULT_DURATION = '0 min';

export type UserStats = {
  dayStreak: number;
  bestScore: number;
  improvement: number; // percentage of latest vs previous completion
};

const EMPTY_STATS: UserStats = { dayStreak: 0, bestScore: 0, improvement: 0 };

type LessonCompletionRow = {
  level_key: string;
  lesson_key: string;
  completed: boolean | null;
  score: number | null;
  created_at: string | null;
};

type UserProgressRow = {
  lesson_id: string; // uuid matches lessons.id 
  xp: number | null;
  completed: boolean | null;
};

//fetch the sign module
export async function fetchSignModule(userId?: string): Promise<{
  levels: Level[];
  lessonMap: Record<string, Lesson>;
  stats: UserStats;
}> {
  const [levelRows, lessonRows, completions, progressRows] = await Promise.all([
    fetchLevels(),
    fetchLessons(),
    userId ? fetchCompletions(userId) : Promise.resolve<LessonCompletionRow[]>([]),
    userId ? fetchProgress(userId) : Promise.resolve<UserProgressRow[]>([]),
  ]);

  if (!levelRows.length) {
    return { levels: [], lessonMap: {}, stats: EMPTY_STATS };
  }

  const lessonIds = lessonRows.map((l) => l.id);
  const signRows = lessonIds.length ? await fetchSigns(lessonIds) : [];

  const levels = assembleLevels(levelRows, lessonRows, signRows, completions, progressRows);
  const lessonMap = buildLessonMap(levels);
  const stats = computeStats(completions);

  return { levels, lessonMap, stats };
}

//internal fetch helpers 
async function fetchLevels() {
  const { data, error } = await supabase
    .from('levels')
    .select('id, level_name, level_number')
    .eq('module', MODULE)
    .order('level_number', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

async function fetchLessons() {
  const { data, error } = await supabase
    .from('lessons')
    .select(
      `id, lesson_title, level_id,
       sign_lesson_details ( xp, description, level_number, lesson_number, lesson_title )`
    )
    .eq('module', MODULE);
  if (error) throw error;
  return data ?? [];
}

async function fetchSigns(lessonIds: string[]) {
  const { data, error } = await supabase
    .from('lesson_signs')
    .select('id, lesson_id, sign_id, label, image_url, video_url, hint, gesture_key, sort_order')
    .in('lesson_id', lessonIds)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

async function fetchCompletions(userId: string): Promise<LessonCompletionRow[]> {
  const { data, error } = await supabase
    .from('lesson_completions')
    .select('level_key, lesson_key, completed, score, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

async function fetchProgress(userId: string): Promise<UserProgressRow[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('lesson_id, xp, completed')
    .eq('user_id', userId);
  if (error) throw error;
  return data ?? [];
}

//internal assembly helpers 

function assembleLevels(
  levelRows: Awaited<ReturnType<typeof fetchLevels>>,
  lessonRows: Awaited<ReturnType<typeof fetchLessons>>,
  signRows: Awaited<ReturnType<typeof fetchSigns>>,
  completions: LessonCompletionRow[],
  progressRows: UserProgressRow[],
): Level[] {
  const isCompleted = (levelKey: string, lessonKey: string) =>
    completions.some((c) => c.level_key === levelKey && c.lesson_key === lessonKey && c.completed);

  const earnedXpFor = (lessonUuid: string) =>
    progressRows.find((p) => p.lesson_id === lessonUuid)?.xp ?? 0;

  return levelRows.map((lvl) => {
    const levelId = `level-${lvl.level_number}`;

    const lessonsForLevel = lessonRows
      .filter((l) => l.level_id === lvl.id)
      .map((l) => {
        // sign_lesson_details is returned as an array by supabase-js
        const details = Array.isArray(l.sign_lesson_details)
          ? l.sign_lesson_details[0]
          : l.sign_lesson_details;

        const lessonId = `lesson-${details?.lesson_number ?? 0}`;

        const signs: SignItem[] = signRows
          .filter((s) => s.lesson_id === l.id)
          .map((s) => ({
            signId: s.sign_id,
            label: s.label,
            image: s.image_url,
            video: s.video_url,
            hint: s.hint ?? '',
            gestureKey: s.gesture_key ?? '',
          }));

        const lesson: Lesson = {
          lessonId,
          lessonUuid: l.id,
          title: details?.lesson_title ?? l.lesson_title,
          description: details?.description ?? '',
          descriptionpractice: details?.description ?? '',
          duration: DEFAULT_DURATION,
          xp: details?.xp ?? 0,
          earnedXp: earnedXpFor(l.id),
          completed: isCompleted(levelId, lessonId),
          signs,
        };
        return { lesson, lessonNumber: details?.lesson_number ?? 0 };
      })
      .sort((a, b) => a.lessonNumber - b.lessonNumber)
      .map((x) => x.lesson);

    const completedCount = lessonsForLevel.filter((l) => l.completed).length;

    return {
      levelId,
      title: lvl.level_name,
      level: lvl.level_number,
      completed: completedCount,
      total: lessonsForLevel.length,
      lessons: lessonsForLevel,
    };
  });
}

function buildLessonMap(levels: Level[]): Record<string, Lesson> {
  const map: Record<string, Lesson> = {};
  levels.forEach((level) => {
    level.lessons.forEach((lesson) => {
      map[`${level.levelId}_${lesson.lessonId}`] = lesson;
    });
  });
  return map;
}

function computeStats(completions: LessonCompletionRow[]): UserStats {
  if (!completions.length) return EMPTY_STATS;

  const scores = completions.map((c) => c.score ?? 0);
  const bestScore = Math.max(...scores);

  const last = scores[scores.length - 1];
  const prev = scores.length > 1 ? scores[scores.length - 2] : last;
  const improvement = last - prev;

  const uniqueDays = Array.from(
    new Set(completions.map((c) => (c.created_at ?? '').slice(0, 10)))
  );
  const dayStreak = computeStreak(uniqueDays);

  return { dayStreak, bestScore, improvement };
}

function computeStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const daySet = new Set(dates);
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (daySet.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else if (streak === 0 && key === new Date().toISOString().slice(0, 10)) {
      cursor.setDate(cursor.getDate() - 1); // today not done yet — check yesterday
    } else {
      break;
    }
  }
  return streak;
}

//`scorePct` is 0-100.
export async function recordLessonCompletion(params: {
  userId: string;
  lessonUuid: string; // lessons.id (uuid), needed for user_progress FK
  levelKey: string; // 'level-1'
  lessonKey: string; //'lesson-1'
  scorePct: number; // 0-100
  durationSeconds?: number;
  totalXp: number; // the lesson's total XP
}) {
  const { userId, lessonUuid, levelKey, lessonKey, scorePct, durationSeconds, totalXp } = params;
  const earnedXp = Math.round((scorePct / 100) * totalXp);

  const { error: completionErr } = await supabase.from('lesson_completions').insert({
    user_id: userId,
    level_key: levelKey,
    lesson_key: lessonKey,
    score: Math.round(scorePct),
    completed: true,
  });
  if (completionErr) throw completionErr;

  const { error: progressErr } = await supabase.from('user_progress').upsert(
    {
      user_id: userId,
      lesson_id: lessonUuid,
      completed: true,
      score: Math.round(scorePct),
      duration: durationSeconds ?? null,
      xp: earnedXp,
      current_level: levelKey,
      current_lesson: lessonKey,
    },
    { onConflict: 'user_id,lesson_id' }
  );
  if (progressErr) throw progressErr;
}
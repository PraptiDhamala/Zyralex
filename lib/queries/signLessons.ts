import { supabase } from '@/lib/supabase';
import type { Level, Lesson, SignItem } from '@/constants/lessonData';

const MODULE = 'sign' as const;

const DEFAULT_DURATION = '7 min';

type LessonCompletionRow = {
  level_key: string;
  lesson_key: string;
  completed: boolean | null;
  score: number | null;
};

//Fetches levels, lessons, signs

export async function fetchSignLessonLevels(userId?: string): Promise<Level[]> {
  //Levels
  const { data: levelRows, error: levelErr } = await supabase
    .from('levels')
    .select('id, level_name, level_number')
    .eq('module', MODULE)
    .order('level_number', { ascending: true });

  if (levelErr) throw levelErr;
  if (!levelRows?.length) return [];

  //Lessons join their sign_lesson_details
  const { data: lessonRows, error: lessonErr } = await supabase
    .from('lessons')
    .select(
      `id, lesson_title, level_id,
       sign_lesson_details ( xp, description, level_number, lesson_number, lesson_title )`
    )
    .eq('module', MODULE);

  if (lessonErr) throw lessonErr;

  const lessonIds = (lessonRows ?? []).map((l) => l.id);

  // All signs for those lessons
  const { data: signRows, error: signErr } = lessonIds.length
    ? await supabase
        .from('lesson_signs')
        .select('id, lesson_id, sign_id, label, image_url, video_url, hint, gesture_key, sort_order')
        .in('lesson_id', lessonIds)
        .order('sort_order', { ascending: true })
    : { data: [], error: null };

  if (signErr) throw signErr;

  // Completion state for specific user
  let completions: LessonCompletionRow[] = [];
  if (userId) {
    const { data: compRows, error: compErr } = await supabase
      .from('lesson_completions')
      .select('level_key, lesson_key, completed, score')
      .eq('user_id', userId);
    if (compErr) throw compErr;
    completions = compRows ?? [];
  }

  const isCompleted = (levelKey: string, lessonKey: string) =>
    completions.some((c) => c.level_key === levelKey && c.lesson_key === lessonKey && c.completed);

  // Assemble
  const levels: Level[] = levelRows.map((lvl) => {
    const levelId = `level-${lvl.level_number}`;

    const lessonsForLevel = (lessonRows ?? [])
      .filter((l) => l.level_id === lvl.id)
      .map((l) => {
        // sign_lesson_details is returned as an array by supabase-js
        const details = Array.isArray(l.sign_lesson_details)
          ? l.sign_lesson_details[0]
          : l.sign_lesson_details;

        const lessonId = `lesson-${details?.lesson_number ?? 0}`;

        const signs: SignItem[] = (signRows ?? [])
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
          title: details?.lesson_title ?? l.lesson_title,
          description: details?.description ?? '',
          descriptionpractice: details?.description ?? '',
          duration: DEFAULT_DURATION,
          xp: details?.xp ?? 0,
          completed: isCompleted(levelId, lessonId),
          signs,
        };
        return { lesson, lessonNumber: details?.lesson_number ?? 0 };
      })
      .sort((a, b) => a.lessonNumber - b.lessonNumber)
      .map((x) => x.lesson);

    const completedCount = lessonsForLevel.filter((l) => l.completed).length;

    const level: Level = {
      levelId,
      title: lvl.level_name,
      level: lvl.level_number,
      completed: completedCount,
      total: lessonsForLevel.length,
      lessons: lessonsForLevel,
    };
    return level;
  });

  return levels;
}

// Lesson map, matching LESSON_MAP
export function buildLessonMap(levels: Level[]): Record<string, Lesson> {
  const map: Record<string, Lesson> = {};
  levels.forEach((level) => {
    level.lessons.forEach((lesson) => {
      map[`${level.levelId}_${lesson.lessonId}`] = lesson;
    });
  });
  return map;
}

// Writes lesson completion results (called from lesson.tsx and updatesuser_progress
export async function recordLessonCompletion(params: {
  userId: string;
  lessonUuid: string; // lessons.id (uuid): needed for user_progress FK
  levelKey: string; //'level-1'
  lessonKey: string; //'lesson-1'
  scorePct: number; // 0-100
  durationSeconds?: number;
  xp?: number;
}) {
  const { userId, lessonUuid, levelKey, lessonKey, scorePct, durationSeconds, xp } = params;

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
      xp: xp ?? null,
      current_level: levelKey,
      current_lesson: lessonKey,
    },
    { onConflict: 'user_id,lesson_id' }
  );
  if (progressErr) throw progressErr;
}
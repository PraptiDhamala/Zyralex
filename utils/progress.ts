import { supabase } from "../lib/supabase";
export async function getLatestAssessment(userId: string) {
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data; // null => user has never taken the diagnostic
}

export async function getLessonRow(levelKey: string, lessonKey: string) {
  const { data, error } = await supabase
    .from("lessons")
    .select("id, sort_order")
    .eq("level_key", levelKey)
    .eq("lesson_key", lessonKey)
    .single();
  if (error) throw error;
  return data;
}
export async function getCurrentProgress(userId: string) {
  const { data } = await supabase
    .from("user_progress")
    .select("current_level, current_lesson, completed_levels")
    .eq("user_id", userId)
    .maybeSingle();
  return data; // null if first time
}

export async function saveCurrentProgress(
  userId: string,
  currentLevel: string,
  currentLesson: string,
) {
  await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      current_level: currentLevel,
      current_lesson: currentLesson,
    },
    { onConflict: "user_id" },
  );
}
export async function markLevelCompleted(userId: string, level: string) {
  // Read existing completed_levels first
  const { data } = await supabase
    .from("user_progress")
    .select("completed_levels")
    .eq("user_id", userId)
    .maybeSingle();

  const existing: string[] = data?.completed_levels ?? [];
  if (existing.includes(level)) return; // already marked

  await supabase
    .from("user_progress")
    .upsert(
      { user_id: userId, completed_levels: [...existing, level] },
      { onConflict: "user_id" },
    );
}
export async function getLevelProgress(userId: string, levelKey: string) {
  const { data, error } = await supabase
    .from("user_progress")
    .select(
      "lesson_id, completed, unlocked, lessons!inner(level_key, lesson_key, sort_order)",
    )
    .eq("user_id", userId)
    .eq("lessons.level_key", levelKey)
    .order("lessons(sort_order)", { ascending: true });
  if (error) throw error;
  return data;
}

export async function upsertLessonProgress(params: {
  userId: string;
  levelKey: string;
  lessonKey: string;
  completed: boolean;
  score: number;
}) {
  const { error } = await supabase.from("lesson_completions").upsert(
    {
      user_id: params.userId,
      level_key: params.levelKey,
      lesson_key: params.lessonKey,
      completed: params.completed,
      score: params.score,
    },
    { onConflict: "user_id,level_key,lesson_key" },
  );
  if (error) throw error;
}

export async function unlockLesson(userId: string, lessonId: string) {
  const { error } = await supabase
    .from("user_progress")
    .upsert(
      { user_id: userId, lesson_id: lessonId, unlocked: true },
      { onConflict: "user_id,lesson_id" },
    );
  if (error) throw error;
}

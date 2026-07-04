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
  lessonId: string;
  completed: boolean;
  score: number;
  duration: number;
}) {
  const { userId, lessonId, completed, score, duration } = params;
  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      completed,
      score,
      duration,
      unlocked: true,
    },
    { onConflict: "user_id,lesson_id" },
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

// hooks/useSignModule.ts
import { fetchSignModule, type UserStats } from '@/lib/queries/signModule';
import { supabase } from '@/lib/supabase';
import type { Lesson, Level } from '@/types/lesson';
import { useCallback, useEffect, useState } from 'react';

const EMPTY_STATS: UserStats = { 
  dayStreak: 0,
  totalXp: 0,
  avgAccuracy: 0,
  currentLevelId: null,
  currentLessonId: null
 };

export function useSignModule() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [lessonMap, setLessonMap] = useState<Record<string, Lesson>>({});
  const [stats, setStats] = useState<UserStats>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const result = await fetchSignModule(user?.id);
      setLevels(result.levels);
      setLessonMap(result.lessonMap);
      setStats(result.stats);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load sign module data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { levels, lessonMap, stats, loading, error, refetch: load };
}
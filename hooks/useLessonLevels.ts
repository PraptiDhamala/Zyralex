// hooks/useLessonLevels.ts
import type { Lesson, Level } from '@/constants/lessonData';
import { buildLessonMap, fetchSignLessonLevels } from '@/lib/queries/signLessons';
import { supabase } from '@/lib/supabase';
import { useCallback, useEffect, useState } from 'react';

export function useLessonLevels() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [lessonMap, setLessonMap] = useState<Record<string, Lesson>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const data = await fetchSignLessonLevels(user?.id);
      //Fetch lessons and levels according to the user
      setLevels(data);
      setLessonMap(buildLessonMap(data));
    } catch (e: any) {
      setError(e.message ?? 'Failed to load lessons');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { levels, lessonMap, loading, error, refetch: load };
}
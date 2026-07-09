import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export type UserStats = {
    dayStreak: number;
    bestScore: number;
    improvement: number;    //Improvement score in comparison to previous attempt
};

const EMPTY_STATS: UserStats = { dayStreak: 0, bestScore: 0, improvement: 0 };

function computeStreak(dates: string[]): number {
    if(!dates.length) return 0;
    const daySet = new Set(dates);
    let streak= 0;
    const cursor= new Date();
    cursor.setHours(0,0,0,0);

    while (true) {
        const key = cursor.toISOString().slice(0,10);
        
  if (daySet.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else if (streak === 0 && key === new Date().toISOString().slice(0, 10)) {
      // today not completed yet; still check yesterday to keep streak alive
      cursor.setDate(cursor.getDate() - 1);
      continue;
    } else {
      break;
    }
  }
  return streak;
}
 
export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    let cancelled = false;
 
    (async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
 
      if (!user) {
        if (!cancelled) {
          setStats(EMPTY_STATS);
          setLoading(false);
        }
        return;
      }
 
      const { data, error } = await supabase
        .from('lesson_completions')
        .select('score, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
 
      if (cancelled) return;
 
      if (error || !data?.length) {
        setStats(EMPTY_STATS);
        setLoading(false);
        return;
      }
 
      const scores = data.map((d) => d.score ?? 0);
      const bestScore = Math.max(...scores);
 
      const last = scores[scores.length - 1];
      const prev = scores.length > 1 ? scores[scores.length - 2] : last;
      const improvement = last - prev;
 
      const uniqueDays = Array.from(
        new Set(data.map((d) => (d.created_at ?? '').slice(0, 10)))
      );
      const dayStreak = computeStreak(uniqueDays);
 
      setStats({ dayStreak, bestScore, improvement });
      setLoading(false);
    })();
 
    return () => {
      cancelled = true;
    };
  }, []);
 
  return { stats, loading };
}

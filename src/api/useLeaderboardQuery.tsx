import { useSupabase } from '@/hooks';
import { SupabaseClient } from '@/lib';
import { useQuery } from '@tanstack/react-query';

export function getLeaderboard(client: SupabaseClient) {
  return client
    .from('scores')
    .select('score_id, wpm, accuracy, duration, time_stamp, users (email)')
    .order('wpm', { ascending: false })
    .order('accuracy', { ascending: false })
    .limit(10)
    .then((res) =>
      (res.data ?? []).map((s) => ({
        id: s.score_id,
        email: s.users?.email ?? 'Anonymous',
        wpm: s.wpm,
        accuracy: s.accuracy,
        duration: s.duration,
        timeStamp: new Date(s.time_stamp).toLocaleString(),
      })),
    );
}

export function useLeaderboardQuery() {
  const { client } = useSupabase();

  const key = ['leaderboard'];

  return useQuery(key, async () => {
    return getLeaderboard(client).then((result) => result);
  });
}

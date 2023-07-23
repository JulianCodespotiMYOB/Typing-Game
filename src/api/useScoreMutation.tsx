import { useSupabase } from '@/hooks';
import { SupabaseClient } from '@/lib';
import { GameStats } from '@/types';
import { useMutation } from '@tanstack/react-query';

type Request = GameStats & { userId: string };

export const insertScoreForUser = (
  client: SupabaseClient,
  request: Request,
) => {
  return client.from('scores').insert([
    {
      user_id: request.userId,
      wpm: request.wpm,
      raw_wpm: request.rawWpm,
      accuracy: request.accuracy,
      incorrect_keystrokes: request.incorrectKeystrokes,
      correct_keystrokes: request.correctKeystrokes,
      duration: request.time,
      time_stamp: new Date().toISOString(),
      missed_words: request.missedWords,
    },
  ]);
};

export function useScoreMutation() {
  const { client } = useSupabase();

  return useMutation(async (request: Request) => {
    return insertScoreForUser(client, request).then((result) => result.data);
  });
}

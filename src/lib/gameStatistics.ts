import { Word, WordStatus } from '@/types';

export function calculateGameStatistics(wordList: Word[], totalTime: number) {
  const typedWords = wordList.filter((word) => word.typed.length > 0);

  const totalEntries = typedWords.reduce(
    (total, word) => total + word.typed.length,
    0
  );

  const correctEntries =
    typedWords.reduce(
      (total, word) =>
        total + (word.status == WordStatus.Completed ? word.typed.length : 0),
      0
    ) +
    typedWords.length -
    1;
  const incorrectEntries = totalEntries - correctEntries;
  const totalWordsTyped = totalEntries / 5;
  const totalErrors = incorrectEntries / 5;
  const errorsPerMinute = totalErrors / (totalTime / 60);

  const rawWpm = totalWordsTyped / (totalTime / 60);
  const wpm = rawWpm - errorsPerMinute;
  const accuracy = (correctEntries / totalEntries) * 100;

  return {
    wpm,
    rawWpm,
    accuracy,
    time: totalTime,
  };
}

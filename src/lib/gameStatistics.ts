import { Word, WordStatus } from '@/types';

type GameStatistics = {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  time: number;
  missedWords: string[];
};

export function calculateGameStatistics(
  wordList: Word[],
  totalTime: number,
): GameStatistics {
  const typedWords = wordList.filter((word) => word.typed.length > 0);

  const {
    missedWords,
    correctCharacters,
    totalTypedCharacters,
    correctKeystrokes,
    incorrectKeystrokes,
  } = gatherStatistics(typedWords);

  const rawWpm = calculateRawWpm(totalTypedCharacters, totalTime);
  const wpm = calculateWpm(correctCharacters, totalTime);
  const accuracy = calculateAccuracy(
    correctKeystrokes,
    incorrectKeystrokes,
    missedWords.length,
  );

  return {
    wpm,
    rawWpm,
    accuracy,
    time: totalTime,
    missedWords,
  };
}

function gatherStatistics(typedWords: Word[]) {
  let correctCharacters = 0;
  let incorrectCharacters = 0;
  let totalTypedCharacters = 0;
  let correctKeystrokes = 0;
  let incorrectKeystrokes = 0;
  const missedWords: string[] = [];

  typedWords.forEach((word) => {
    totalTypedCharacters += word.typed.replace(/\s+/g, '').length;
    if (word.status === WordStatus.Skipped) {
      missedWords.push(word.text);
      return;
    }

    if (word.status === WordStatus.Completed) {
      correctCharacters++;
      totalTypedCharacters++;
    }

    correctKeystrokes += word.correctKeystrokes;
    incorrectKeystrokes += word.incorrectKeystrokes;

    const { correctChars, incorrectChars } = countCharacters(word);

    correctCharacters += correctChars;
    incorrectCharacters += incorrectChars;
  });

  return {
    missedWords,
    correctCharacters,
    incorrectCharacters,
    totalTypedCharacters,
    correctKeystrokes,
    incorrectKeystrokes,
  };
}

function countCharacters(word: Word) {
  let correctChars = 0;
  let incorrectChars = 0;

  for (let i = 0; i < word.typed.length; i++) {
    if (word.text[i] === word.typed[i]) {
      correctChars++;
    } else {
      incorrectChars++;
    }
  }

  return { correctChars, incorrectChars };
}

function calculateRawWpm(
  totalTypedCharacters: number,
  totalTime: number,
): number {
  return (totalTypedCharacters / 5 / totalTime) * 60;
}

function calculateWpm(correctCharacters: number, totalTime: number): number {
  return (correctCharacters / 5 / totalTime) * 60;
}

function calculateAccuracy(
  correctKeystrokes: number,
  incorrectKeystrokes: number,
  missedWords: number,
): number {
  return (
    (correctKeystrokes /
      (incorrectKeystrokes + correctKeystrokes + missedWords)) *
    100
  );
}

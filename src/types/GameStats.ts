export type GameStats = {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  time: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
  missedWords: number;
};

export const InitialGameStats: GameStats = {
  wpm: 0,
  rawWpm: 0,
  accuracy: 0,
  time: 0,
  correctKeystrokes: 0,
  incorrectKeystrokes: 0,
  missedWords: 0,
};

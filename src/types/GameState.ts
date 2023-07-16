import { Word } from './Word';

export type Language = 'en' | 'es' | 'it';

export type GameState = {
  wordList: Word[];
  currentIndex: number;
  userInput: string;
  gameIsActive: boolean;
  gameIsFinished: boolean;
};

export type GameSettings = {
  wordListStyle: Language;
  totalTime: number;
  wordCount: number;
};

export const InitialGameState: GameState = {
  wordList: [],
  currentIndex: 0,
  userInput: '',
  gameIsActive: false,
  gameIsFinished: false,
};

export const InitialGameSettings: GameSettings = {
  totalTime: 60,
  wordCount: 100,
  wordListStyle: 'en',
};

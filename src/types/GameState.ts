import { Word } from "./Word";

export type GameState = {
  wordList: Word[];
  currentIndex: number;
  userInput: string;
  userScore: number;
  gameIsActive: boolean;
  totalTime: number;
  wordCount: number;
};

export const InitialGameState: GameState = {
  wordList: [],
  currentIndex: 0,
  userInput: "",
  userScore: 0,
  gameIsActive: false,
  totalTime: 3,
  wordCount: 100,
};

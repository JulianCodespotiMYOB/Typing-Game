import { Word } from "./Word";

export type GameState = {
  wordList: Word[];
  currentIndex: number;
  userInput: string;
  gameIsActive: boolean;
  totalTime: number;
  wordCount: number;
  gameIsFinished: boolean;
};

export const InitialGameState: GameState = {
  wordList: [],
  currentIndex: 0,
  userInput: "",
  gameIsActive: false,
  gameIsFinished: false,
  totalTime: 3,
  wordCount: 100,
};

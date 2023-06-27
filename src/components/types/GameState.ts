import { Word } from "./Word";

export type GameState = {
  wordList: Word[];
  currentIndex: number;
  userInput: string;
  userScore: number;
  gameIsActive: boolean;
};


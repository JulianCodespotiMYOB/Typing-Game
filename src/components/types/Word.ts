import { WordStatus } from "../enums/WordStatus";

export interface Word {
  text: string;
  status: WordStatus;
  typed: string;
}
import { WordStatus } from "./WordStatus";

export interface Word {
  text: string;
  status: WordStatus;
  typed: string;
}

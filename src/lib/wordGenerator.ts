import { Language } from "@/types";
import { generate } from "random-words";
import Translate from "translate";

export async function createWords(wordCount: number, wordStyle: Language): Promise<string[]> {
  const words = generate(wordCount).join(" ");
  const translated = await Translate(words, { from: "en", to: wordStyle });
  return translated.split(" ");
}

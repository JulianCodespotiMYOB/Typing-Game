export interface Word {
  text: string;
  status: WordStatus;
  typed: string;
}

import { WordStatus } from '@/types/WordStatus';
import { GameState } from '@/types/GameState';

type GameAction =
  | { type: 'INPUT'; payload: string }
  | { type: 'START' }
  | { type: 'SKIP' }
  | { type: 'DELETE' }
  | { type: 'DELETE_WORD' }
  | { type: 'START_OVER' }
  | { type: 'LOAD_WORDLIST'; payload: string[] }
  | { type: 'FINISH_GAME' };

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'LOAD_WORDLIST': {
      const wordList = action.payload.map((word) => ({
        text: word,
        status: WordStatus.Untyped,
        typed: '',
      }));
      return { ...state, wordList };
    }

    case 'START': {
      const wordList = [...state.wordList];
      const currentWord: Word = { ...wordList[state.currentIndex] };
      currentWord.status = WordStatus.Typing;
      wordList[state.currentIndex] = currentWord;
      return { ...state, gameIsActive: true, wordList, gameIsFinished: false };
    }

    case 'INPUT': {
      const wordList = [...state.wordList];
      const currentWord: Word = { ...wordList[state.currentIndex] };
      currentWord.typed = action.payload;
      wordList[state.currentIndex] = currentWord;

      return {
        ...state,
        userInput: action.payload,
        wordList,
      };
    }

    case 'SKIP': {
      const wordList = [...state.wordList];
      const currentWord: Word = { ...wordList[state.currentIndex] };
      const wordIsCompleted = currentWord.typed === currentWord.text;
      currentWord.status = wordIsCompleted
        ? WordStatus.Completed
        : WordStatus.Skipped;

      wordList[state.currentIndex] = currentWord;
      return {
        ...state,
        userInput: '',
        currentIndex: state.currentIndex + 1,
        wordList,
      };
    }

    case 'DELETE': {
      const wordList = [...state.wordList];
      const currentWord: Word = { ...wordList[state.currentIndex] };
      if (currentWord.status === WordStatus.Completed) return state;

      if (state.userInput === '' && state.currentIndex > 0) {
        const previousWord: Word = { ...wordList[state.currentIndex - 1] };
        if (previousWord.status === WordStatus.Skipped) {
          previousWord.status = WordStatus.Typing;
          wordList[state.currentIndex - 1] = previousWord;
          return {
            ...state,
            userInput: previousWord.typed,
            currentIndex: state.currentIndex - 1,
            wordList,
          };
        }
      } else if (state.userInput !== '') {
        currentWord.typed = state.userInput.slice(0, -1);
        wordList[state.currentIndex] = currentWord;
        return {
          ...state,
          userInput: currentWord.typed,
          wordList,
        };
      }
      return state;
    }

    case 'DELETE_WORD': {
      const wordList = [...state.wordList];
      const currentWord: Word = { ...wordList[state.currentIndex] };

      if (state.userInput === '' && state.currentIndex > 0) {
        const previousWord: Word = { ...wordList[state.currentIndex - 1] };
        if (previousWord.status === WordStatus.Skipped) {
          previousWord.status = WordStatus.Untyped;
          previousWord.typed = '';
          wordList[state.currentIndex - 1] = previousWord;
          return {
            ...state,
            wordList,
            currentIndex: state.currentIndex - 1,
          };
        }
      }

      currentWord.status = WordStatus.Untyped;
      currentWord.typed = '';

      wordList[state.currentIndex] = currentWord;
      return {
        ...state,
        userInput: '',
        wordList,
      };
    }

    case 'START_OVER': {
      return {
        ...state,
        currentIndex: 0,
        userInput: '',
        gameIsActive: false,
        gameIsFinished: false,
      };
    }

    case 'FINISH_GAME': {
      return {
        ...state,
        gameIsActive: false,
        gameIsFinished: true,
      };
    }

    default:
      return state;
  }
};

export default gameReducer;

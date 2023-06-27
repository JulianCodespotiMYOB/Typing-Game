import { WordStatus } from "@/components/enums/WordStatus";
import { GameState } from "@/components/types/GameState";
import { Word } from "@/components/types/Word";

type GameAction =
    | { type: 'INPUT'; payload: string }
    | { type: 'SKIP' }
    | { type: 'DELETE' }
    | { type: 'START_OVER' }
    | { type: 'LOAD_WORDLIST'; payload: string[] }
    | { type: 'TIME_OVER' };

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'LOAD_WORDLIST': {
            const wordList = action.payload.map(word => ({ text: word, status: WordStatus.Untyped, typed: '' }));
            return { ...state, wordList };
        }

        case 'INPUT': {
            const wordList = [...state.wordList];
            const currentWord: Word = { ...wordList[state.currentIndex] };
            currentWord.typed = action.payload;
            if (action.payload === currentWord.text) {
                currentWord.status = WordStatus.Completed;
                state.userScore += 1;
            }
            wordList[state.currentIndex] = currentWord;
            return { ...state, userInput: action.payload, wordList };
        }

        case 'SKIP': {
            const wordList = [...state.wordList];
            const currentWord: Word = { ...wordList[state.currentIndex] };
            if (currentWord.status === WordStatus.Completed || state.userInput.trim() !== '') {
                currentWord.status = currentWord.status === WordStatus.Completed ? WordStatus.Completed : WordStatus.Skipped;
                wordList[state.currentIndex] = currentWord;
                return {
                    ...state,
                    userInput: '',
                    currentIndex: state.currentIndex + 1,
                    wordList
                };
            }
            return state;
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
                        wordList
                    };
                }
            } else if (state.userInput !== '') {
                currentWord.typed = state.userInput.slice(0, -1);
                wordList[state.currentIndex] = currentWord;
                return {
                    ...state,
                    userInput: currentWord.typed,
                    wordList
                };
            }
            return state;
        }

        case 'START_OVER': {
            const wordList = state.wordList.map(word => ({ ...word, status: WordStatus.Untyped }));
            return {
                ...state,
                currentIndex: 0,
                userInput: '',
                userScore: 0,
                gameIsActive: false,
                wordList
            };
        }

        case 'TIME_OVER':
            return { ...state, gameIsActive: false };

        default:
            return state;
    }
};

export default gameReducer;

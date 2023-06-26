"use client";

import React, {ChangeEvent, useEffect, useReducer, useRef} from 'react';
import TypingInput from './TypingInput';
import WordsDisplay from './WordsDisplay';
import Timer from './Timer';
import GameControls from './GameControls';
import {generate} from 'random-words';
import useCountdown from '../../hooks/useCountdown'; // path might vary based on your directory structure

export enum WordStatus {
    Untyped,
    Typing,
    Completed,
    Skipped
}

export interface Word {
    text: string;
    status: WordStatus;
    typed: string;
}

interface GameState {
    words: Word[];
    currentIndex: number;
    currentInput: string;
    score: number;
    active: boolean;
}

type Action =
    | { type: 'TYPE'; payload: string }
    | { type: 'SKIP' }
    | { type: 'BACKSPACE' }
    | { type: 'RESET' }
    | { type: 'LOAD_WORDS'; payload: string[] }
    | { type: 'TIMEOUT' };

const initialState: GameState = {
    words: [],
    currentIndex: 0,
    currentInput: '',
    score: 0,
    active: false,
};

const gameReducer = (state: GameState, action: Action): GameState => {
    let currentWord = {} as Word;
    switch (action.type) {
        case 'LOAD_WORDS':
            return {
                ...state,
                words: action.payload.map(word => ({text: word, status: WordStatus.Untyped, typedText: '', typed: ''}))
            };

        case 'TYPE':
            currentWord = state.words[state.currentIndex];
            currentWord.typed = action.payload;
            if (action.payload === currentWord.text) {
                currentWord.status = WordStatus.Completed;
                return {
                    ...state,
                    currentInput: '',
                    currentIndex: state.currentIndex + 1,
                    score: state.score + 1,
                };
            }
            return { ...state, currentInput: action.payload };

        case 'SKIP':
            currentWord = state.words[state.currentIndex];
            if (state.currentInput !== ' ' && state.currentInput !== '') {
                currentWord.status = WordStatus.Skipped;
                return {
                    ...state,
                    currentInput: '',
                    currentIndex: state.currentIndex + 1,
                };
            }
            return state;

        case 'BACKSPACE':
            currentWord = state.words[state.currentIndex];
            if (state.currentInput === '' && state.currentIndex > 0) {
                console.log("hit")
                let prevWord = state.words[state.currentIndex - 1];
                if (prevWord.status === WordStatus.Skipped) {
                    prevWord.status = WordStatus.Typing;
                    return {
                        ...state,
                        currentInput: prevWord.typed,
                        currentIndex: state.currentIndex - 1,
                    };
                }
            } else {
                if (state.currentInput !== '') {
                    currentWord.typed = state.currentInput.slice(0, -1);
                }
                return { ...state, currentInput: currentWord.typed };
            }
            return state;

        case 'RESET':
            return {
                ...state,
                currentIndex: 0,
                currentInput: '',
                score: 0,
                active: false,
                words: state.words.map(word => ({...word, status: WordStatus.Untyped}))
            };

        case 'TIMEOUT':
            return {
                ...state,
                active: false
            };

        default:
            return state;
    }
};

const Game: React.FC = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const {words, currentIndex, currentInput, score, active} = state;
    const initialTime = 60;
    const {timeLeft, resetTimer} = useCountdown(initialTime, active);
    const typingInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const keyPressed = e.nativeEvent.data;
        if (keyPressed === null || keyPressed === undefined) {
            return;
        }

        if (keyPressed === ' ') {
            dispatch({ type: 'SKIP' });
        }
        else if (keyPressed !== ' ') {
            dispatch({ type: 'TYPE', payload: input });
        }
    };

    const handleReset = () => {
        dispatch({type: 'RESET'});
        resetTimer();
    };

    const handleBackspace = (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
            dispatch({type: 'BACKSPACE'});
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleBackspace);
        return () => window.removeEventListener('keydown', handleBackspace);
    }, []);

    useEffect(() => {
        const maxWords = 100;
        const randomWordList = generate(maxWords);
        dispatch({type: 'LOAD_WORDS', payload: randomWordList});
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            dispatch({type: 'TIMEOUT'});
        }
    }, [timeLeft]);

    return (
        <div onClick={() => typingInputRef.current?.focus()}>
            <Timer timeLeft={timeLeft}/>
            <WordsDisplay words={words} currentIndex={currentIndex} currentInput={currentInput}/>
            <TypingInput ref={typingInputRef} value={currentInput} handleChange={handleInputChange}/>
            <GameControls score={score} handleReset={handleReset}/>
        </div>
    );
};

export default Game;

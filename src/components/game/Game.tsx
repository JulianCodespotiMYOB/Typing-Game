"use client";

import React, { ChangeEvent, useEffect, useReducer, useRef } from 'react';
import { generate } from 'random-words';

import { gameReducer, useTimer } from '@/hooks';
import { InitialGameState } from '@/types';

import Timer from './timer';
import WordsDisplay from './wordsDisplay';
import TypingInput from './typingInput';
import GameControls from './gameControls';

const Game: React.FC = () => {
    const [state, dispatch] = useReducer(gameReducer, InitialGameState);

    const { startTimer, stopTimer, resetTimer, time } = useTimer(state.totalTime);

    const typingInputRef = useRef<HTMLInputElement>(null);

    const onInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (!state.gameIsActive) {
            dispatch({ type: 'START' });
        }

        const input = event.target.value;
        const lastKeyPressed = event.nativeEvent.data;

        if (lastKeyPressed === ' ') {
            dispatch({ type: 'SKIP' });
        } else if (lastKeyPressed) {
            dispatch({ type: 'INPUT', payload: input });
        }
    };

    const onKeydown = (event: KeyboardEvent) => {
        const { key, ctrlKey, altKey, metaKey } = event;
        
        const isBackspace = key === 'Backspace';
        const isDelete = key === 'Delete';
        
        const isRegularBackspace = isBackspace && !(ctrlKey || altKey || metaKey);
        if (isRegularBackspace) {
            dispatch({type: 'DELETE'});
        }
        
        const isWordDeletionKeyCombination = (isBackspace && ctrlKey) || (isDelete && altKey) || (isBackspace && altKey);
        if (isWordDeletionKeyCombination) {
            dispatch({type: 'DELETE_WORD'});
        }

        const isEntireLineDeletionKeyCombination = (isBackspace || isDelete) && metaKey;
        if (isEntireLineDeletionKeyCombination) {
            dispatch({type: 'DELETE_WORD'});
        }
    };

    const onRestart = () => {
        resetTimer();
        const randomWordList = generate(state.wordCount);
        dispatch({type: 'START_OVER'});
        dispatch({type: 'LOAD_WORDLIST', payload: randomWordList});
    };

    // Listen to time changes
    useEffect(() => {
        if (time <= 0) {
            dispatch({type: 'TIME_OVER'});
        }
    }, [time]);

    // Listen to game state changes
    useEffect(() => {
        if (state.gameIsActive) {
            startTimer();
        } else {
            stopTimer();
        }
    }, [startTimer, state.gameIsActive, stopTimer]);

    // Initialize game
    useEffect(() => {
        window.addEventListener('keydown', onKeydown);

        const randomWordList = generate(state.wordCount);

        dispatch({type: 'LOAD_WORDLIST', payload: randomWordList});

        return () => window.removeEventListener('keydown', onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div onClick={() => typingInputRef.current?.focus()}>
            <WordsDisplay words={state.wordList} currentWordIndex={state.currentIndex} currentInput={state.userInput}/>
            <TypingInput ref={typingInputRef} value={state.userInput} handleChange={onInput} disabled={time <= 0}/>
            <div className="flex justify-between">
                <Timer timeLeft={time}/>
                <GameControls handleReset={onRestart}/>
            </div>
        </div>
    );
};

export default Game;

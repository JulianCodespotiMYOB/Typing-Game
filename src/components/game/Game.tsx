"use client";

import React, { ChangeEvent, useEffect, useReducer, useRef } from 'react';
import TypingInput from './TypingInput';
import WordsDisplay from './WordsDisplay';
import Timer from './Timer';
import GameControls from './GameControls';
import { generate } from 'random-words';
import useCountdown from '../../hooks/useCountdown'; 
import gameReducer from '../../hooks/gameReducer';
import { GameState } from '../types/GameState';

const initialState: GameState = {
    wordList: [],
    currentIndex: 0,
    userInput: '',
    userScore: 0,
    gameIsActive: false,
};

const Game: React.FC = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    
    const {wordList, currentIndex, userInput, userScore, gameIsActive} = state;
    const gameTime = 60;
    const {timeLeft, resetTimer} = useCountdown(gameTime, gameIsActive);
    const typingInputRef = useRef<HTMLInputElement>(null);

    const processInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const lastKeyPressed = event.nativeEvent.data;

        if (lastKeyPressed === ' ') {
            dispatch({ type: 'SKIP' });
        } else if (lastKeyPressed) {
            dispatch({ type: 'INPUT', payload: input });
        }
    };

    const processKeydown = (event: KeyboardEvent) => {
        const { key, ctrlKey, altKey, metaKey } = event;
        
        const isBackspace = key === 'Backspace';
        const isDelete = key === 'Delete';
        
        const isRegularBackspace = isBackspace && !(ctrlKey || altKey || metaKey);
        if (isRegularBackspace) {
            dispatch({type: 'DELETE'});
        }
        
        const isWordDeletionKeyCombination = (isBackspace && ctrlKey) || (isDelete && altKey) || (isBackspace && altKey);
        if (isWordDeletionKeyCombination) {
            const words = state.userInput.split(" ");
            words.pop(); 
            const updatedInput = words.join(" ");
            dispatch({type: 'INPUT', payload: updatedInput});
        }
    
        const isEntireLineDeletionKeyCombination = (isBackspace || isDelete) && metaKey;
        if (isEntireLineDeletionKeyCombination) {
            dispatch({type: 'INPUT', payload: ''});
        }
    };
    

    const restartGame = () => {
        dispatch({type: 'START_OVER'});
        resetTimer();
    };

    useEffect(() => {
        window.addEventListener('keydown', processKeydown);
        return () => window.removeEventListener('keydown', processKeydown);
    });

    useEffect(() => {
        const wordCount = 100;
        const randomWordList = generate(wordCount);
        dispatch({type: 'LOAD_WORDLIST', payload: randomWordList});
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            dispatch({type: 'TIME_OVER'});
        }
    }, [timeLeft]);

    return (
        <div onClick={() => typingInputRef.current?.focus()}>
            <Timer timeLeft={timeLeft}/>
            <WordsDisplay words={wordList} currentWordIndex={currentIndex} currentInput={userInput}/>
            <TypingInput ref={typingInputRef} value={userInput} handleChange={processInputChange}/>
            <GameControls handleReset={restartGame}/>
        </div>
    );
};

export default Game;

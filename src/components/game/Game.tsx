"use client";

import React, {
  ChangeEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { generate } from "random-words";

import { gameReducer, useTimer } from "@/hooks";
import { InitialGameState } from "@/types";

import Timer from "./Timer";
import WordsDisplay from "./WordsDisplay";
import TypingInput from "./TypingInput";
import GameControls from "./GameControls";
import GameSettings from "./GameSettings";
import EndGameSettings from "@/components/game/EndGameSettings";
import GameStatistics from "@/components/game/GameStatistics";
import { calculateGameStatistics } from "@/calculations/gameStatistics";

const Game: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, InitialGameState);

  const [gameStats, setGameStats] = useState({
    wpm: 0,
    rawWpm: 0,
    accuracy: 0,
    time: 0,
  });

  const { startTimer, stopTimer, resetTimer, time } = useTimer(state.totalTime);

  const typingInputRef = useRef<HTMLInputElement>(null);

  const onInput = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!state.gameIsActive) {
      dispatch({ type: "START" });
    }

    const input = event.target.value;
    const lastKeyPressed = (event.nativeEvent as InputEvent).data;

    if (lastKeyPressed === " ") {
      dispatch({ type: "SKIP" });
    } else if (lastKeyPressed) {
      dispatch({ type: "INPUT", payload: input });
    }
  };

  const onKeydown = (event: KeyboardEvent): void => {
    const { key, ctrlKey, altKey, metaKey } = event;

    const isBackspace = key === "Backspace";
    const isDelete = key === "Delete";

    const isRegularBackspace = isBackspace && !(ctrlKey || altKey || metaKey);
    if (isRegularBackspace) {
      dispatch({ type: "DELETE" });
    }

    const isWordDeletionKeyCombination = (isBackspace && ctrlKey) || (isDelete && altKey) || (isBackspace && altKey);
    if (isWordDeletionKeyCombination) {
      dispatch({ type: "DELETE_WORD" });
    }

    const isEntireLineDeletionKeyCombination = (isBackspace || isDelete) && metaKey;
    if (isEntireLineDeletionKeyCombination) {
      dispatch({ type: "DELETE_WORD" });
    }
  };

  const onRestart = (): void => {
    resetTimer();
    const randomWordList = generate(state.wordCount);
    dispatch({ type: "START_OVER" });
    dispatch({ type: "LOAD_WORDLIST", payload: randomWordList });
  };

  const handleTimeChange = (time: number): void => {
    stopTimer();
    dispatch({ type: "SET_TIME", payload: time });
    startTimer();
  };

  const handleNextGame = (): void => {
    dispatch({ type: "START_OVER" });
    dispatch({ type: "LOAD_WORDLIST", payload: generate(state.wordCount) });
  };

  const handleRepeatGame = (): void => {
    dispatch({ type: "START_OVER" });
  };

  // Listen to time changes
  useEffect((): void => {
    if (time <= 0) {
      dispatch({ type: "FINISH_GAME" });
    }
  }, [time]);

  // Listen to game state changes
  useEffect((): void => {
    if (state.gameIsActive) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [startTimer, state.gameIsActive, stopTimer]);

  // Calculate game statistics
  useEffect(() => {
    if (state.gameIsFinished) {
      const stats = calculateGameStatistics(state.wordList, state.totalTime);
      setGameStats(stats);
    }
  }, [state.gameIsFinished]);

  // Initialize game
  useEffect(() => {
    window.addEventListener("keydown", onKeydown);

    const randomWordList: string[] = generate(state.wordCount);

    dispatch({ type: "LOAD_WORDLIST", payload: randomWordList });

    return () => window.removeEventListener("keydown", onKeydown);
  }, [state.wordCount]);

  return (
    <>
      {!state.gameIsFinished && (
        <div onClick={() => typingInputRef.current?.focus()}>
          {!state.gameIsActive && !state.gameIsFinished && <GameSettings handleTimeChange={handleTimeChange} />}

          <WordsDisplay words={state.wordList} currentWordIndex={state.currentIndex} currentInput={state.userInput} />
          <TypingInput ref={typingInputRef} value={state.userInput} handleChange={onInput} disabled={time <= 0} />
          <div className="flex justify-between">
            <Timer timeLeft={time} />
            <GameControls handleReset={onRestart} />
          </div>
        </div>
      )}

      {state.gameIsFinished && (
        <div className="w-full">
          <EndGameSettings handleNextGame={handleNextGame} handleRepeatGame={handleRepeatGame} />
          <GameStatistics
            wpm={gameStats.wpm}
            rawWpm={gameStats.rawWpm}
            accuracy={gameStats.accuracy}
            time={gameStats.time}
          />
        </div>
      )}
    </>
  );
};

export default Game;

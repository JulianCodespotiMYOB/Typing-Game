"use client";

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import { gameReducer, useTimer } from "@/hooks";
import { GameSettings as GameSettingsT, InitialGameSettings, InitialGameState, Language } from "@/types";

import Timer from "./Timer";
import WordsDisplay from "./WordsDisplay";
import TypingInput from "./TypingInput";
import GameControls from "./GameControls";
import GameSettings from "./GameSettings";
import EndGameSettings from "@/components/game/EndGameSettings";
import GameStatistics from "@/components/game/GameStatistics";
import { calculateGameStatistics } from "@/lib/gameStatistics";
import { createWords } from "@/lib/wordGenerator";

const Game: React.FC = () => {
  const [settings, setSettings] = useState<GameSettingsT>(InitialGameSettings);
  const [state, dispatch] = useReducer(gameReducer, InitialGameState);
  const [gameStats, setGameStats] = useState({ wpm: 0, rawWpm: 0, accuracy: 0, time: 0 });

  const { startTimer, stopTimer, resetTimer, time } = useTimer(settings.totalTime);

  const typingInputRef = useRef<HTMLInputElement>(null);

  const onSetupGame = useCallback((): void => {
    createWords(settings.wordCount, settings.wordListStyle).then((words) => {
      resetTimer();
      dispatch({ type: "START_OVER" });
      dispatch({ type: "LOAD_WORDLIST", payload: words });
    });
  }, [resetTimer, settings.wordCount, settings.wordListStyle]);

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

  const handleTimeChange = (time: number): void => {
    stopTimer();
    setSettings({ ...settings, totalTime: time });
    startTimer();
  };

  const handleLanguageChange = (lang: Language): void => {
    setSettings({ ...settings, wordListStyle: lang });
  };

  const handleNextGame = (): void => {
    dispatch({ type: "START_OVER" });
    onSetupGame();
  };

  const handleRepeatGame = (): void => {
    dispatch({ type: "START_OVER" });
  };

  useEffect((): void => {
    if (time <= 0) {
      dispatch({ type: "FINISH_GAME" });
    }
  }, [time]);

  useEffect((): void => {
    onSetupGame();
  }, [settings.wordCount, settings.wordListStyle]);

  useEffect((): void => {
    if (state.gameIsActive) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [startTimer, state.gameIsActive, stopTimer]);

  useEffect(() => {
    if (state.gameIsFinished) {
      const stats = calculateGameStatistics(state.wordList, settings.totalTime);
      setGameStats(stats);
    }
  }, [state.gameIsFinished]);

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);

    onSetupGame();

    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  return (
    <>
      {!state.gameIsFinished && (
        <div className="flex flex-col items-center justify-center h-full">
          {!state.gameIsActive && !state.gameIsFinished && (
            <GameSettings
              handleTimeChange={handleTimeChange}
              handleLanguageChange={handleLanguageChange}
              currentTime={settings.totalTime}
              currentLanguage={settings.wordListStyle}
            />
          )}
          <div onClick={() => typingInputRef.current?.focus()}>
            <WordsDisplay words={state.wordList} currentWordIndex={state.currentIndex} currentInput={state.userInput} />
            <TypingInput ref={typingInputRef} value={state.userInput} handleChange={onInput} disabled={time <= 0} />
            <div className="flex justify-between">
              <Timer timeLeft={time} />
              <GameControls handleReset={onSetupGame} />
            </div>
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

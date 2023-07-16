import { Word, WordStatus } from '@/types';
import React, { useMemo } from 'react';

export type WordsDisplayProps = {
  words: Word[];
  currentWordIndex: number;
  currentInput: string;
};

type LetterRenderData = {
  currentLetter: string;
  letterIndex: number;
  style: string;
  isStartOfWord: boolean;
  shouldPlaceCaret: boolean;
};

type WordRenderData = {
  word: Word;
  wordIndex: number;
  letters: LetterRenderData[];
};

const determineLetterStyle = (
  wordIndex: number,
  currentLetter: string,
  word: Word,
  letterIndex: number,
  currentWordIndex: number,
  currentInput: string,
) => {
  let style = 'text-gray-500';

  const isCurrentWord = wordIndex === currentWordIndex;
  const isTypedInCurrentWord =
    isCurrentWord && currentInput.length > letterIndex;
  const isTyped = word.typed.length > letterIndex;
  const isSkippedWord = word.status === WordStatus.Skipped;
  const isCompletedWord = word.status === WordStatus.Completed;

  if (isTyped) {
    style =
      currentLetter === word.typed[letterIndex] ? 'text-white' : 'text-red-500';
  }

  if (isTypedInCurrentWord) {
    style =
      currentLetter === currentInput[letterIndex]
        ? 'text-white'
        : 'text-red-500';
  }

  if (isSkippedWord) {
    style += ' text-gray-800 underline decoration-red-700';
  }

  if (isCompletedWord) {
    style = 'text-white';
  }

  return style;
};

const WordsDisplay: React.FC<WordsDisplayProps> = ({
  words,
  currentWordIndex,
  currentInput,
}) => {
  const wordsRenderData = useMemo(() => {
    return words.map((word, wordIndex) => {
      const letters: LetterRenderData[] = word.text
        .split('')
        .map((currentLetter, letterIndex) => {
          const style = determineLetterStyle(
            wordIndex,
            currentLetter,
            word,
            letterIndex,
            currentWordIndex,
            currentInput,
          );
          const isStartOfWord =
            wordIndex === currentWordIndex &&
            currentInput.length === 0 &&
            letterIndex === 0;
          const shouldPlaceCaret =
            wordIndex === currentWordIndex &&
            letterIndex === currentInput.length - 1;

          return {
            currentLetter,
            letterIndex,
            style,
            isStartOfWord,
            shouldPlaceCaret,
          };
        });

      return { word, wordIndex, letters } as WordRenderData;
    });
  }, [words, currentWordIndex, currentInput]);

  const renderLetterAndCaret = (
    letterToDisplay: JSX.Element,
    shouldPlaceCaret: boolean,
    isStartOfWord: boolean,
  ) => {
    const caret = <span className='caret'></span>;
    return shouldPlaceCaret ? (
      <>
        {letterToDisplay}
        {caret}
      </>
    ) : isStartOfWord ? (
      <>
        {caret}
        {letterToDisplay}
      </>
    ) : (
      letterToDisplay
    );
  };

  const displayLetters = (letters: LetterRenderData[]) => {
    return letters.map(
      ({
        currentLetter,
        letterIndex,
        style,
        isStartOfWord,
        shouldPlaceCaret,
      }) => {
        const letterToDisplay = (
          <span key={letterIndex} className={style}>
            {currentLetter}
          </span>
        );
        return renderLetterAndCaret(
          letterToDisplay,
          shouldPlaceCaret,
          isStartOfWord,
        );
      },
    );
  };

  const displayErrors = (word: Word) => {
    return (
      word.typed.length > word.text.length && (
        <span
          className={`text-red-500 ${
            word.status === WordStatus.Skipped
              ? 'underline decoration-red-700'
              : ''
          }`}
        >
          {word.typed.slice(word.text.length)}
        </span>
      )
    );
  };

  return (
    <div className='p-4 text-center text-3xl font-mono'>
      {wordsRenderData.map(({ word, wordIndex, letters }) => (
        <span key={wordIndex}>
          {displayLetters(letters)}
          {displayErrors(word)}
          <span> </span>
        </span>
      ))}
    </div>
  );
};

export default WordsDisplay;

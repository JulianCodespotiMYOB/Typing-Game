import React from 'react';
import { Word } from '../types/Word';
import { WordStatus } from '../enums/WordStatus';

interface WordsDisplayProps {
    words: Word[];
    currentWordIndex: number;
    currentInput: string;
};

const WordsDisplay: React.FC<WordsDisplayProps> = ({ words, currentWordIndex, currentInput }) => {
    const getLetterStyle = (wordIndex: number, currentLetter: string, word: Word, letterIndex: number) => {
        let style = 'text-gray-800';

        const isCurrentWord = wordIndex === currentWordIndex;
        const isTypedInCurrentWord = isCurrentWord && currentInput.length > letterIndex;
        const isTyped = word.typed.length > letterIndex;
        const isSkippedWord = word.status === WordStatus.Skipped;
        const isCompletedWord = word.status === WordStatus.Completed;

        if (isTyped) {
            style = currentLetter === word.typed[letterIndex] ? 'text-white' : 'text-red-500';
        } 

        if (isTypedInCurrentWord) {
            style = currentLetter === currentInput[letterIndex] ? 'text-white' : 'text-red-500';
        }

        if (isSkippedWord) {
          style += ' text-gray-800 underline decoration-red-700';
        }
        else if (isCompletedWord) {
          style = 'text-white';
        }
        return style;
    };

    const isCurrentWord = (wordIndex: number) => wordIndex === currentWordIndex;

    const exceedsCurrentWord = (word: Word) => word.typed.length > word.text.length;

    return (
      <div className="p-4 text-center text-3xl font-mono">
          {words.map((word, wordIndex) => (
              <span key={wordIndex}>
                  {word.text.split('').map((currentLetter: string, letterIndex: number) => {
                      const style = getLetterStyle(wordIndex, currentLetter, word, letterIndex);
                      const isStartOfWord = isCurrentWord(wordIndex) && currentInput.length === 0 && letterIndex === 0;
                      const shouldPlaceCaret = isCurrentWord(wordIndex) && letterIndex === currentInput.length - 1;
                      const letterToDisplay = <span key={letterIndex} className={style}>{currentLetter}</span>;
                      const caret = <span className="caret"></span>;
                      return shouldPlaceCaret ? [letterToDisplay, caret] : (isStartOfWord ? [caret, letterToDisplay] : letterToDisplay);
                  })}
                  {exceedsCurrentWord(word) &&
                      <span className="text-red-500">{currentInput.slice(word.text.length)}</span>}
                  <span> </span>
              </span>
          ))}
      </div>
  );
  
  
};

export default WordsDisplay;
import React from 'react';
import { Word, WordStatus } from './Game';

type WordsDisplayProps = {
  words: Word[];
  currentIndex: number;
  currentInput: string;
};

const WordsDisplay: React.FC<WordsDisplayProps> = ({ words, currentIndex, currentInput }) => {
  return (
      <div className="p-4 text-center text-3xl font-mono">
        {<span className="caret"></span>}
        {words.map((word, index) => (
            <span key={index}>
                    {word.text.split('').map((letter: string, letterIndex: number) => {
                      let style = 'text-gray-800';
                      if (index === currentIndex) {
                        if (currentInput.length > letterIndex) {
                          style = letter === currentInput[letterIndex] ? 'text-white' : 'text-red-500';
                        }
                      } else if (word.status === WordStatus.Skipped) {
                        style = 'text-gray-500 underline decoration-red-700';
                      }
                      else if (word.status === WordStatus.Completed) {
                        style = 'text-white';
                      }
                      return <span key={letterIndex} className={style}>{letter}</span>;
                    })}
              {index === currentIndex && currentInput.length > word.text.length &&
                  <span className="text-red-500">{currentInput.slice(word.text.length)}</span>}
              <span> </span>
                </span>
        ))}
      </div>
  );
};

export default WordsDisplay;

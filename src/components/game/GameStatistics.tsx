import React from 'react';

interface GameStatisticsProps {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  time: number;
}

const GameStatistics: React.FC<GameStatisticsProps> = ({
  wpm,
  rawWpm,
  accuracy,
  time,
}) => {
  return (
    <div className='rounded-lg px-4 py-6 max-w-sm mx-auto'>
      <h2 className='font-bold text-3xl mb-4 text-white-800 animate-pulse'>
        Game Statistics
      </h2>
      <ul className='space-y-4'>
        <li className='flex items-center justify-between'>
          <span className='text-white-600'>Total Time:</span>
          <span className='font-bold text-white-800 animate-bounce'>
            {time}s
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <span className='text-white-600'>Words per Minute:</span>
          <span className='font-bold text-white-800 animate-bounce'>
            {wpm.toFixed(2)}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <span className='text-white-600'>Raw Words per Minute:</span>
          <span className='font-bold text-white-800 animate-bounce'>
            {rawWpm.toFixed(2)}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <span className='text-white-600'>Accuracy:</span>
          <span className='font-bold text-white-800 animate-bounce'>
            {accuracy.toFixed(2)}%
          </span>
        </li>
      </ul>
    </div>
  );
};

export default GameStatistics;

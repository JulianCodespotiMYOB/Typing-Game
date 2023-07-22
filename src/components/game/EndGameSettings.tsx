import React from 'react';

interface EndGameSettingsProps {
  handleNextGame: () => void;
  handleRepeatGame: () => void;
}

const EndGameSettings: React.FC<EndGameSettingsProps> = ({
  handleNextGame,
  handleRepeatGame,
}) => {
  return (
    <div className='flex justify-center space-x-4 mt-6'>
      <button
        onClick={handleNextGame}
        className='px-4 py-2 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300'
      >
        Next Game
      </button>
      <button
        onClick={handleRepeatGame}
        className='px-4 py-2 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300'
      >
        Repeat Game
      </button>
    </div>
  );
};

export default EndGameSettings;

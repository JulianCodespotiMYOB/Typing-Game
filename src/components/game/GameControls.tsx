import React from 'react';

type GameControlsProps = {
    handleReset: () => void;
    score: number;
};

const GameControls: React.FC<GameControlsProps> = ({score, handleReset}) => {
    return (
        <div className="controls">
            <p>Score: {score}</p>
            <button onClick={handleReset} className="btn-reset">Reset</button>
        </div>
    );
};

export default GameControls;

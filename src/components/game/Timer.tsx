import React from 'react';

type TimerProps = {
    timeLeft: number;
};

const Timer: React.FC<TimerProps> = ({timeLeft}) => {
    return <div>Time left: {timeLeft} seconds</div>;
};

export default Timer;

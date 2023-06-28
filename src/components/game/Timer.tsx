import React from 'react';

type TimerProps = {
    timeLeft: number;
};

const Timer: React.FC<TimerProps> = ({timeLeft}) => {
    const positiveTimeLeft = timeLeft > 0 ? timeLeft : 0;
    return <div>Time left: {positiveTimeLeft} seconds</div>;
};

export default Timer;

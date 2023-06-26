import {useEffect, useState} from 'react';

const useCountdown = (initialTime: number, active: boolean) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (active && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setTimeLeft(initialTime);
        }

        return () => {
            clearInterval(interval);
        };
    }, [active, initialTime, timeLeft]);

    const resetTimer = () => {
        setTimeLeft(initialTime);
    };

    return {timeLeft, resetTimer};
};

export default useCountdown;

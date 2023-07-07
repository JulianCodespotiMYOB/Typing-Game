import {useCallback, useState} from 'react';

const useTypingGame = (randomWords: string[], resetTimer: () => void) => {
    const [words, setWords] = useState<string[]>(randomWords);
    const [currentInput, setCurrentInput] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [active, setActive] = useState(false);

    const handleInputChange = useCallback(
        (input: string) => {
            // game starts as soon as user types
            if (!active) setActive(true);

            setCurrentInput(input);

            const currentWord = words[currentWordIndex];

            // User typed the current word correctly
            if (currentWord && input === currentWord + ' ') {
                setCurrentInput('');
                setCurrentWordIndex((prev) => prev + 1);
                setScore((prev) => prev + 1);
            }
        },
        [active, words, currentWordIndex]
    );

    const handleReset = () => {
        setActive(false);
        setCurrentInput('');
        setCurrentWordIndex(0);
        setScore(0);
        resetTimer();
        setWords(randomWords);
    };

    return {words, currentWordIndex, currentInput, score, active, handleInputChange, handleReset};
};

export default useTypingGame;

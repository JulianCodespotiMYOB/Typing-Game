import {forwardRef} from 'react';

type TypingInputProps = {
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TypingInput = forwardRef<HTMLInputElement, TypingInputProps>((props, ref) => {
    return (
        <input
            type="text"
            value={props.value}
            disabled={false}
            onChange={props.handleChange}
            ref={ref}
            className="p-2 w-full rounded shadow-md mt-6 opacity-0"
        />
    );
});

TypingInput.displayName = 'TypingInput';
export default TypingInput;


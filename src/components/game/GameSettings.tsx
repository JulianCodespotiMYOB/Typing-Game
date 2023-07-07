import React from "react";

export type SettingsProps = {
  handleTimeChange: (time: number) => void;
};

const GameSettings: React.FC<SettingsProps> = ({ handleTimeChange }) => {
  const times = [15, 30, 45, 60, 90, 120];

  return (
    <div className="settings-bar flex justify-between items-center p-4 bg-gray-950 border border-gray-900">
      <div className="time-selector">
        <ul className="flex space-x-4">
          {times.map((time) => (
            <li
              key={time}
              className="cursor-pointer p-2 rounded-full hover:bg-gray-300 transition-colors duration-200 ease-in-out"
              onClick={() => {
                handleTimeChange(time);
              }}
            >
              {time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameSettings;

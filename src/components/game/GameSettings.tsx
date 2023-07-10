import { Language } from "@/types";
import React from "react";

export type SettingsProps = {
  handleTimeChange: (time: number) => void;
  currentTime: number;
  handleLanguageChange: (lang: Language) => void;
  currentLanguage: Language;
};

const ShortToLongLanguageMap: Record<Language, string> = {
  en: "English",
  es: "Spanish",
  it: "Italian",
};

const GameSettings: React.FC<SettingsProps> = ({
  handleTimeChange,
  handleLanguageChange,
  currentTime,
  currentLanguage,
}) => {
  const times = [15, 30, 45, 60, 90, 120];
  const languages: Language[] = ["en", "es", "it"];

  return (
    <div className="settings-bar flex justify-start space-x-5 px-4 py-2 rounded-lg h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div className="flex items-center">
        <span className="text-white mr-2">Language:</span>
        <select
          className="bg-gray-800 text-white px-2 py-1 rounded-lg"
          value={currentLanguage}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {ShortToLongLanguageMap[lang]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <span className="text-white mr-2">Time:</span>
        <select
          className="bg-gray-800 text-white px-2 py-1 rounded-lg"
          value={currentTime}
          onChange={(e) => handleTimeChange(Number(e.target.value))}
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GameSettings;

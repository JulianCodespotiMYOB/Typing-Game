import { Language } from "@/types";
import React from "react";

export type SettingsProps = {
  handleTimeChange: (time: number) => void;
  currentTime: number;
  handleLanguageChange: (lang: Language) => void;
  currentLanguage: Language;
  isVisible: boolean;
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
  isVisible,
}) => {
  const times = [15, 30, 45, 60, 90, 120];
  const languages: Language[] = ["en", "es", "it"];

  const createLanguageOptions = () =>
    languages.map((lang) => (
      <option key={lang} value={lang}>
        {ShortToLongLanguageMap[lang]}
      </option>
    ));
  
  const createTimeOptions = () =>
    times.map((time) => (
      <option key={time} value={time}>
        {time}
      </option>
    ));

  return (
    <div className={`flex justify-start space-x-5 px-4 py-2 rounded-lg h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center">
        <label className="text-white mr-2">Language</label>
        <select
          className="bg-gray-800 text-white px-2 py-1 rounded-lg"
          value={currentLanguage}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
        >
          {createLanguageOptions()}
        </select>
        <span className="ml-7 border-l-2 border-gray-600 mx-2 h-6"></span>
      </div>

      <div className="flex items-center">
        <label className="text-white mr-2">Time</label>
        <select
          className="bg-gray-800 text-white px-2 py-1 rounded-lg"
          value={currentTime}
          onChange={(e) => handleTimeChange(Number(e.target.value))}
        >
          {createTimeOptions()}
        </select>
      </div>
    </div>
  );
};

export default GameSettings;

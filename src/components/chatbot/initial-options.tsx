"use client";

import { ChatOption } from "@/lib/chat-constants";

interface InitialOptionsProps {
  options: ChatOption[];
  onOptionClick: (option: ChatOption) => void;
  isDisabled?: boolean;
}

export default function InitialOptions({
  options,
  onOptionClick,
  isDisabled = false,
}: InitialOptionsProps) {
  return (
    <div className="flex flex-col mt-4 max-w-2xl w-full">
      {options.map((option, index) => (
        <button
          key={option.id}
          onClick={() => onOptionClick(option)}
          disabled={isDisabled}
          className={`flex flex-col items-start p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-left ${
            index === 0 ? "rounded-t-lg" : ""
          } ${index === options.length - 1 ? "rounded-b-lg" : ""} ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <h3 className="font-medium text-primary dark:text-blue-400 text-md">
            {option.text}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {option.description}
          </p>
        </button>
      ))}
    </div>
  );
}

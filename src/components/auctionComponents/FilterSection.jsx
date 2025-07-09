import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Title from "../common/Title";

const FilterSection = ({ title, options, checkedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#D0D0D0] p-5 rounded-lg">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Title level="title24">{title}</Title>
        {isOpen ? (
          <Minus size={22} className="transition duration-400" />
        ) : (
          <Plus size={22} className="transition duration-400" />
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-[10px] cursor-pointer mt-4"
          >
            <input
              type="checkbox"
              className="hidden"
              onChange={() => onChange(option.value)}
            />

            <div className="relative">
              {/* Checked */}
              <span
                className={`${
                  checkedOptions[option.value]
                    ? "opacity-100 z-20 scale-[1]"
                    : "opacity-0 scale-[0.4] z-[-1]"
                } transition-all duration-200 absolute top-0 left-0`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect
                    width="20"
                    height="20"
                    rx="4"
                    className="fill-[#4275F6]"
                    stroke="#3B9DF8"
                  />
                  <path
                    d="M5 10.5L8.2 13.7L15 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* Unchecked */}
              <span
                className={`${
                  !checkedOptions[option.value]
                    ? "opacity-100 z-20 scale-[1]"
                    : "opacity-0 scale-[0.4] z-[-1]"
                } transition-all duration-200`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect
                    width="20"
                    height="20"
                    rx="4"
                    className="fill-transparent"
                    stroke="#ccc"
                  />
                </svg>
              </span>
            </div>

            <span className="text-[1rem] lg:text-[1.2rem] text-[#424242]">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;

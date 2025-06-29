import React from "react";

const SelectComponent = ({
  className = "",
  icon = null,
  options = [],
  ...props
}) => {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 md:py-3 rounded-[5px] shadow-[5px_5px_15px_0px_rgba(0,0,0,0.05)] border border-[#ECECEC] bg-white ${className}`}
    >
      {icon && <div className="text-gray-500">{icon}</div>}
      <select
        className=" bg-transparent outline-none text-gray-700 px-3"
        defaultValue=""
        {...props}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-black"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;

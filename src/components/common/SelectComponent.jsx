import { useEmail } from "@/hooks/useEmail";
import React from "react";

const SelectComponent = ({
  className = "",
  icon = null,
  options = {}, // object of id: label
  field = "country", // 🔑 the key to set in the search object
  ...props
}) => {
  const { setSearch } = useEmail();
  const optionEntries = Object.entries(options); // [['0', 'Bangladesh'], ['57', 'UK']]

  const handleChange = (e) => {
    const selectedKey = e.target.value;
    const selectedLabel = options[selectedKey]; // 🟢 use the label

    setSearch((prev) => ({
      ...prev,
      [field]: selectedLabel,
    }));
  };

  return (
    <div
      className={`flex items-center px-2 md:py-1 lg:py-2 xlg:py-2.5 rounded-[5px] shadow-[5px_5px_15px_0px_rgba(0,0,0,0.05)] border border-[#ECECEC] bg-white ${className}`}
    >
      {icon && <div className="text-gray-500">{icon}</div>}
      <select
        className="bg-transparent outline-none text-gray-700 px-3"
        defaultValue=""
        onChange={handleChange}
        {...props}
      >
        <option value="" >
          Select an option
        </option>

        {optionEntries.map(([key, label]) => (
          <option key={key} value={key} className="text-black">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;

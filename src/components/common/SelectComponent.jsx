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
      className={`w-full sm:w-auto flex items-center gap-2 px-3 py-1 rounded-[5px] shadow-[0_0_8px_0_rgba(0,0,0,0.05)] border border-[#ECECEC] bg-white ${className}`}
    >
      {icon && <div className="text-gray-500">{icon}</div>}
      <select
        className="w-full sm:w-auto flex-1 bg-transparent outline-none text-gray-700 text-sm px-1 py-1"
        defaultValue=""
        onChange={handleChange}
        {...props}
      >
        <option value="">Select</option>
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

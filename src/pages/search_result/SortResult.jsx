import React from "react";
const SortResult = () => {
  const options = [
    {
      label: "Featured",
      value: "Featured",
    },
    {
      label: "Men's Wear",
      value: "mens_wear",
    },
    {
      label: "Women's Wear",
      value: "womens_wear",
    },
    {
      label: "Kids",
      value: "kids",
    },
  ];

  return (
    <div className="p-2 flex items-center gap-4  rounded-full border border-[#E5E5E5] ">
      <select
        className="bg-transparent px-3 border-none outline-none text-gray-700"
        defaultValue=""
      >
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

export default SortResult;

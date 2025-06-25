import React from "react";
import { IoSearch } from "react-icons/io5";
const SearchContainer = () => {
  const options = [
    {
      label: "All Categories",
      value: "all_categories",
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
    <div className="px-5 py-4 flex items-center gap-4 border-[1px] border-[#ddd] rounded-[5px] max-w-[700px] w-full">
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

      <input
        type="text"
        className=" px-3 w-full text-custom-black placeholder-[#838383] text-base bg-transparent border-none outline-none"
        placeholder="Search for items...."
      />
      <span>
        <IoSearch size={20} />
      </span>
    </div>
  );
};

export default SearchContainer;

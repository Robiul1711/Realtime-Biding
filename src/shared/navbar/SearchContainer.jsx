import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchContainer = () => {
  const options = [
    { label: "All Categories", value: "all_categories" },
    { label: "Men's Wear", value: "mens_wear" },
    { label: "Women's Wear", value: "womens_wear" },
    { label: "Kids", value: "kids" },
  ];

  return (
    <div className="w-full px-3 py-2 md:px-5 md:py-4 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 border border-[#ddd] rounded-[5px] md:w-[400px] lg:w-[500px] 2xl:w-[700px]">
      <select
        className="bg-transparent px-2 md:px-3 text-sm md:text-base border-none outline-none text-gray-700 w-[110px] md:w-[140px]"
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
        className="w-full text-sm md:text-base text-custom-black placeholder-[#838383] bg-transparent border-none outline-none px-2 md:px-3"
        placeholder="Search for items..."
      />

      <span className="text-gray-700">
        <IoSearch size={20} />
      </span>
    </div>
  );
};

export default SearchContainer;

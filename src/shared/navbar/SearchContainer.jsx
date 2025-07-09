import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchContainer = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosPublic.get("/categories");
      return response.data;
    },
  });

  const categories = data?.data || [];

  return (
    <div className="w-full px-3 py-2 lg:py-4 xlg:px-5 xlg:py-4 flex items-center gap-2 md:gap-4 border border-[#ddd] rounded-[5px]">
      <select
        className="bg-transparent px-2 xlg:px-3 text-sm xlg:text-base border-none outline-none text-gray-700 w-[18px] md:w-[140px]"
        defaultValue=""
      >
        <option value="" disabled>
          {isLoading ? "Loading..." : "Select Category"}
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug} className="text-black">
            {category.title}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="w-full text-sm md:text-base text-custom-black placeholder-[#838383] bg-transparent border-none outline-none px-2 xlg:px-3"
        placeholder="Search for items..."
      />

      <span className="text-gray-700">
        <IoSearch size={20} />
      </span>
    </div>
  );
};

export default SearchContainer;

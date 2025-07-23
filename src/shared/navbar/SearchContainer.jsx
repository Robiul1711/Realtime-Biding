// SearchContainer.jsx
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchContainer = () => {
  const { setSearch } = useEmail();
  const axiosPublic = useAxiosPublic();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosPublic.get("/categories");
      return response.data;
    },
  });

  const categories = data?.data || [];
  useEffect(() => {
    setSearch({
      cat: selectedCategory?.id ? selectedCategory.id.toString() : "", // Convert to string
      q: keyword,
    });
  }, [selectedCategory, keyword, setSearch]);

  return (
    <div className="w-full pr-3 py-2 lg:py-4 xlg:py-4 flex items-center gap-2 border border-[#ddd] rounded-[5px]">
      {/* Category Dropdown */}
      <select
        className="bg-transparent px-2 text-sm border-none cursor-pointer outline-none text-gray-700 w-[80px] md:w-[200px]"
        value={selectedCategory?.id || ""}
        onChange={(e) => {
          const found = categories.find(
            (cat) => cat.id === parseInt(e.target.value)
          );
          setSelectedCategory(found || null);
        }}
      >
        <option value="" >
          {isLoading ? "Loading..." : "Select Category"}
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id} className="text-black">
            {cat.title}
          </option>
        ))}
      </select>

      <div className="h-6 border-l border-[#9e9595]"></div>

      {/* Keyword Input */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full text-sm text-custom-black placeholder-[#838383] bg-transparent border-none outline-none px-2"
        placeholder="Search for items..."
      />

      <span className="text-gray-700">
        <IoSearch size={20} />
      </span>
    </div>
  );
};

export default SearchContainer;

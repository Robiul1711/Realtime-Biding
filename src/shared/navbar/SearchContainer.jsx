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
<div className="w-full border border-[#ddd] rounded-[5px] px-3 py-2 flex flex-col xxs:flex-row sm:items-center gap-3 sm:gap-2">
  {/* Category Dropdown */}
  <select
    className="bg-transparent text-sm border-none cursor-pointer outline-none text-gray-700 w-full sm:w-[200px] px-2 py-1"
    value={selectedCategory?.id || ""}
    onChange={(e) => {
      const found = categories.find(
        (cat) => cat.id === parseInt(e.target.value)
      );
      setSelectedCategory(found || null);
    }}
  >
    <option value="">{isLoading ? "Loading..." : "Category"}</option>
    {categories.map((cat) => (
      <option key={cat.id} value={cat.id} className="text-black">
        {cat.title}
      </option>
    ))}
  </select>

  {/* Vertical divider for desktop */}
  <div className=" md:h-6 border  sm:border-l border-[#9e9595]"></div>

  {/* Keyword Input + Icon Wrapper */}
  <div className="flex items-center w-full">
    <input
      type="text"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="flex-1 text-sm text-custom-black placeholder-[#838383] bg-transparent border-none outline-none px-2 py-1"
      placeholder="Search for items..."
    />
    <span className="text-gray-700">
      <IoSearch size={20} />
    </span>
  </div>
</div>

  );
};

export default SearchContainer;

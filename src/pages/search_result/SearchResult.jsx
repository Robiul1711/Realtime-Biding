import SearchProductCard from "@/components/search_result_component/SearchProductCard";
import React from "react";
import { CiFilter } from "react-icons/ci";
import SortResult from "./SortResult";
import { FaAngleRight } from "react-icons/fa6";
const SearchResult = () => {
  return (
    <div className="section-padding-x">
      <div className="flex flex-col gap-2 my-10">
        <div className="flex items-center gap-1 text-gray-500">
          <span>Home</span>
          <FaAngleRight />
          <span>Search Results</span>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-[#C3C3C3]">Showing <span className="text-black">20</span> results for <span className="text-black">"“Hats & Caps”"</span></h1>

      </div>
      <div className="flex justify-between items-center border-dashed my-10 border-b border-t border-[#E5E5E5] p-3">
        <p className="py-2 px-3 border border-[#E5E5E5] rounded-full  items-center gap-2 inline-flex">
          <CiFilter /> Filter
        </p>
        <div className="flex items-center gap-2">
          <p>Sort by:</p>
          <SortResult />
        </div>
      </div>
      <SearchProductCard />
    </div>
  );
};

export default SearchResult;

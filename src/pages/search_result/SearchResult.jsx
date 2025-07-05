import SearchProductCard from "@/components/search_result_component/SearchProductCard";
import React from "react";
import { CiFilter } from "react-icons/ci";
import SortResult from "./SortResult";
import { FaAngleRight } from "react-icons/fa6";
import { ScrollRestoration } from "react-router-dom";
const SearchResult = () => {
  return (
    <div className="section-padding-x pb-6">
      <ScrollRestoration />
      <div className="flex flex-col gap-2 my-4 md:my-6 lg:my-10">
        <div className="flex items-center gap-1 text-gray-500">
          <span>Home</span>
          <FaAngleRight />
          <span>Search Results</span>
        </div>
        <h1 className="sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 text-[#C3C3C3]">
          Showing <span className="text-black">20</span> results for{" "}
          <span className="text-black">"“Hats & Caps”"</span>
        </h1>
      </div>
      <div className="flex items-start  justify-between gap-4 md:items-center border-dashed my-4 md:my-6 lg:my-10 border-b border-t border-[#E5E5E5] p-3">
        <p className="py-2 px-3 border border-[#E5E5E5] rounded-full items-center gap-2 inline-flex text-sm sm:text-base">
          <CiFilter /> Filter
        </p>

        <div className="flex  items-center justify-between gap-2 text-sm sm:text-base">
          <p>Sort by:</p>
          <SortResult />
        </div>
      </div>

      <SearchProductCard />
    </div>
  );
};

export default SearchResult;

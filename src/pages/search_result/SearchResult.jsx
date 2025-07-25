import SearchProductCard from "@/components/search_result_component/SearchProductCard";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { ScrollRestoration } from "react-router-dom";
import { useEmail } from "@/hooks/useEmail";
import { TbSearchOff } from "react-icons/tb";
const SearchResult = () => {
  const { searchResults, search } = useEmail();
  return (
    <div className="section-padding-x pb-6 ">
      <ScrollRestoration />
      <div className="flex md:flex-col items-center md:items-start gap-2 my-4 md:my-6 lg:my-10">
        <div className="flex items-center gap-1 text-gray-500">
          <span>Home</span>
          <FaAngleRight />
          <span>Search Results</span>
        </div>
        <h1 className="sm:text-lg md:text-xl lg:text-2xl font-bold  text-[#C3C3C3]">
          Showing <span className="text-black">{searchResults.length}</span>{" "}
          results for
          <span className="text-black"> {search?.q} {search?.q==="" ? "" : search?.country && ","}  {search?.country}</span>
        </h1>
      </div>
      {searchResults.length > 0 ? (
        <SearchProductCard searchResults={searchResults} />
      ) : (
     <div className="flex flex-col items-center justify-center text-center min-h-[300px]">
          <TbSearchOff className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No results found
          </h2>
          <p className="text-gray-500">
            We couldn’t find anything for "<span className="font-medium">{search?.q} </span>".
            <br />
            Try checking your spelling or using different keywords.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResult;

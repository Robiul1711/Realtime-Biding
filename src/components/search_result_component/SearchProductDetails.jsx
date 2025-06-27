import React from "react";
import { ScrollRestoration } from "react-router-dom";
import SearchProductImages from "./SearchProductImages";
import SearchProductText from "./SearchProductText";

const SearchProductDetails = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="flex flex-col md:flex-row justify-between gap-8 w-full section-padding-x section-padding-y">
        <div className="w-full md:w-[60%]">
          <SearchProductImages />
        </div>
        <div className="w-full md:w-[38%] mt-12">
          <SearchProductText />
        </div>
      </div>
    </div>
  );
};

export default SearchProductDetails;

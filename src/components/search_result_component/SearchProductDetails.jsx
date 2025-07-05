import React from "react";
import { ScrollRestoration } from "react-router-dom";
import SearchProductImages from "./SearchProductImages";
import SearchProductText from "./SearchProductText";
import SimilarProduct from "./SimilarProduct";

const SearchProductDetails = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="flex flex-col lg:flex-row justify-between gap-8 w-full section-padding-x py-10">
        <div className="w-full lg:w-[60%]">
          <SearchProductImages />
        </div>
        <div className="w-full lg:w-[38%] mt-4 lg:mt-12">
          <SearchProductText />
        </div>
      </div>
      <SimilarProduct />
    </div>
  );
};

export default SearchProductDetails;

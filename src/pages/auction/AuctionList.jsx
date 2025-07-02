import FilterCard from "@/components/auctionComponents/FilterCard";
import ProductCard from "@/components/auctionComponents/ProductCard";
import BigDeal from "@/components/home_components/BigDeal";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const AuctionList = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="flex flex-col md:flex-row gap-10 section-padding-x py-6 sm:py-10 xl:py-20">
        <div className="w-full md:w-[30%]">
          <FilterCard />
        </div>
        <div className="w-full md:flex-1">
          <ProductCard />
        </div>
      </div>
      <BigDeal />
    </div>
  );
};

export default AuctionList;

import FilterCard from "@/components/auctionComponents/FilterCard";
import ProductCard from "@/components/auctionComponents/ProductCard";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const AuctionList = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="flex gap-10 section-padding-x section-padding-y">
        <div className="w-full md:w-[35%]">
          <FilterCard />
        </div>
        <div className="w-full md:flex-1">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default AuctionList;

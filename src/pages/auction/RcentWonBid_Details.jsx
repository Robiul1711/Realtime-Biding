import BigDeal from "@/components/home_components/BigDeal";
import RecentWonCardBid from "@/components/recentWon_components/RecentWonCardBid";
import RecentWonCardDetails from "@/components/recentWon_components/RecentWonCardDetails";
import RelatedAuctionCard from "@/components/recentWon_components/RelatedAuctionCard";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const RcentWonBid = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="flex gap-8  w-full section-padding-x py-10 md:py-16">
        <div className="w-full md:w-[65%]">
          <RecentWonCardDetails />
        </div>
        <div className="w-full md:w-[35%]">
          <RecentWonCardBid />
        </div>
      </div>
      <RelatedAuctionCard />
      <BigDeal />
    </div>
  );
};

export default RcentWonBid;

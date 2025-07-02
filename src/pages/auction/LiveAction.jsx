import LiveBid from "@/components/auctionComponents/LiveBid";
import LiveDetails from "@/components/auctionComponents/LiveDetails";
import BigDeal from "@/components/home_components/BigDeal";
import RelatedAuctionCard from "@/components/recentWon_components/RelatedAuctionCard";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const LiveAction = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="flex flex-col lg:flex-row  gap-8  w-full section-padding-x py-10 lg:py-16">
        <div className="w-full lg:w-[70%]">
          <LiveDetails />
        </div>
        <div className="w-full lg:w-[30%]">
          <LiveBid />
        </div>
      </div>
      <RelatedAuctionCard />
      <BigDeal />
    </div>
  );
};

export default LiveAction;

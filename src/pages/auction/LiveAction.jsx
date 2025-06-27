import LiveBid from "@/components/auctionComponents/LiveBid";
import LiveDetails from "@/components/auctionComponents/LiveDetails";
import BigDeal from "@/components/home_components/BigDeal";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const LiveAction = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="flex gap-8  w-full section-padding-x py-10 md:py-16">
        <div className="w-full md:w-[65%]">
          <LiveDetails />
        </div>
        <div className="w-full md:w-[35%]">
          <LiveBid />
        </div>
      </div>
      <BigDeal />
    </div>
  );
};

export default LiveAction;

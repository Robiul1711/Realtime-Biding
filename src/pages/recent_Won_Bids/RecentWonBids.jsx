import BigDeal from "@/components/home_components/BigDeal";
import RecentBidCard from "@/components/recentWon_components/RecentBidCard";
import RelatedAuctionCard from "@/components/recentWon_components/RelatedAuctionCard";
import React from "react";

const RecentWonBids = () => {
  return (
    <>
    <div className="section-padding-x space-y-16">
      <div>
        <div className="flex items-center justify-center my-6 w-full gap-2">
            <span className="h-px bg-[#E1E6EF] w-full"></span>
            <p className="text-[#607080]">Today</p>
            <span className="h-px bg-[#E1E6EF] w-full"></span>
        </div>
        <RecentBidCard />
      </div>
      <div>
            <div className="flex items-center justify-center my-6 w-full gap-2">
            <span className="h-px bg-[#E1E6EF] w-full"></span>
            <p className="text-[#607080]">Yesterday</p>
            <span className="h-px bg-[#E1E6EF] w-full"></span>
        </div>
        <RecentBidCard />
      </div>
    </div>
    <RelatedAuctionCard />
      <BigDeal />
    </>
  );
};

export default RecentWonBids;

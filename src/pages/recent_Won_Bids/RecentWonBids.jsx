import BigDeal from "@/components/home_components/BigDeal";
import RecentBidCard from "@/components/recentWon_components/RecentBidCard";
import RelatedAuctionCard from "@/components/recentWon_components/RelatedAuctionCard";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const RecentWonBids = () => {
  const axiosPublic = useAxiosPublic();

  const { data } = useQuery({
    queryKey: ["recent-won-bids"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bids/leatest/won/today`);
      return res.data;
    },
  });
  console.log(data);
  return (
    <>
      <div className="section-padding-x space-y-16">
        <ScrollRestoration />
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

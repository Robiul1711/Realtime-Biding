import BigDeal from "@/components/home_components/BigDeal";
import RecentBidCard from "@/components/recentWon_components/RecentBidCard";
import RelatedAuctionCard from "@/components/recentWon_components/RelatedAuctionCard";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const RecentWonBids = () => {
  const axiosPublic = useAxiosPublic();

  // 1. Today’s Data
  const { data: todayData, isLoading } = useQuery({
    queryKey: ["recent-won-bids-today"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bids/leatest/won/today");
      return res.data?.data;
    },
  });

  // 2. Yesterday’s Data
  const { data: yesterdayData, isLoading1 } = useQuery({
    queryKey: ["recent-won-bids-yesterday"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bids/leatest/won/yesterday");
      return res.data?.data;
    },
  });

  // 3. Category-wise Data
  const { data: categoryData, isLoading2 } = useQuery({
    queryKey: ["recent-won-bids-category"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bids/recent/won/with-category");
      return res.data?.data;
    },
  });
  console.log(todayData, yesterdayData, categoryData);
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
          <RecentBidCard data={todayData} isLoading={isLoading} />
        </div>
        <div>
          <div className="flex items-center justify-center my-6 w-full gap-2">
            <span className="h-px bg-[#E1E6EF] w-full"></span>
            <p className="text-[#607080]">Yesterday</p>
            <span className="h-px bg-[#E1E6EF] w-full"></span>
          </div>
          <RecentBidCard data={yesterdayData} isLoading1={isLoading1} />
        </div>
      </div>
      <RelatedAuctionCard data={categoryData} isLoading2={isLoading2} />
      <BigDeal />
    </>
  );
};

export default RecentWonBids;

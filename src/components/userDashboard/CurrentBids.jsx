import React from "react";
import Title from "../common/Title";
import CurrentBidProduct from "./CurrentBidProduct";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/hooks/useAuth";

const CurrentBids = () => {
  const axiosSecure = useAxiosSecure();
  const { data: RecentBids, isLoading } = useQuery({
    queryKey: ["recent-bids"],
    queryFn: () => axiosSecure.get(`/auth/auctions`),
  });

  console.log(RecentBids?.data?.data)
  return (
    <div>
      <Title level="title24" className="font-semibold">
        Your Current Bids
      </Title>
      <Title level="title16" className="text-[#4E657F] max-w-[500px] mt-2">
        View all the bids you’ve placed and track their status in real-time.
        Stay updated and manage your active offers with ease.
      </Title>

      <div>
        <CurrentBidProduct products={RecentBids?.data?.data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CurrentBids;

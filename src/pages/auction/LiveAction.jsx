import LiveBid from "@/components/auctionComponents/LiveBid";
import LiveDetails from "@/components/auctionComponents/LiveDetails";
import BigDeal from "@/components/home_components/BigDeal";
import RelatedAuctionCard from "@/components/recentWon_components/RelatedAuctionCard";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollRestoration, useParams } from "react-router-dom";

const LiveAction = () => {
  const { id } = useParams();

  const axiosPublic = useAxiosPublic();

  const { data: productDetails, isLoading } = useQuery({
    queryKey: ["products-details", id],
    queryFn: () => axiosPublic.get("/products/" + id),
    select: (res) => res.data.data,
  });

  // if (isLoading) return <p>.</p>;
  // if (!productDetails) return <p>Product not found.</p>;

  // console.log(productDetails);

  return (
    <div>
      <ScrollRestoration />
      <div className="flex flex-col lg:flex-row  gap-8  w-full section-padding-x py-10 lg:py-16">
        <div className="w-full lg:w-[50%] xl:w-[70%]">
          <LiveDetails productDetails={productDetails} isLoading={isLoading} />
        </div>
        <div className="w-full lg:w-[50%] xl:w-[30%]">
          <LiveBid productDetails={productDetails} isLoading={isLoading} />
        </div>
      </div>
      {/* <RelatedAuctionCard /> */}
      <BigDeal />
    </div>
  );
};

export default LiveAction;

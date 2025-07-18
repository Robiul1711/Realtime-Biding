import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Title from "../common/Title";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Completed = () => {
  const axiosSecure = useAxiosSecure();

  const { 
    data: CompletedProduct, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["completed-product"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/auctions/completed`);
      return res.data;
    },
  });

  if (error) {
    return (
      <div className="section-gap text-center">
        <Title level="title32" className="mb-6">
          Completed Auctions
        </Title>
        <p className="text-red-500">Failed to load completed auctions. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <Title level="title32" className="mb-6 text-center">
        Completed Auctions
      </Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          // Skeleton loading state
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <Skeleton height={220} className="w-full" />
              <div className="p-4 flex flex-col gap-3">
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={16} />
                <Skeleton width="50%" height={16} />
                <Skeleton width="70%" height={14} />
                <Skeleton width="50%" height={14} />
                <Skeleton width="100%" height={36} className="mt-2" />
              </div>
            </div>
          ))
        ) : (
          // Actual content
          CompletedProduct?.data?.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={
                  item.images?.[0]
                    ? `${import.meta.env.VITE_IMG_URL}${item.images[0]}`
                    : "https://via.placeholder.com/250"
                }
                alt={item.title}
                className="w-full h-[220px] object-contain bg-gray-50"
              />

              <div className="p-4 flex flex-col gap-2">
                <Title level="title14" className="text-black line-clamp-1">
                  {item.title}
                </Title>

                <p className="text-sm text-gray-600">
                  Bidding Price:{" "}
                  <span className="font-semibold text-black">
                    {item.bid ? `$${item.bid}` : "N/A"}
                  </span>
                </p>

                {item.country && (
                  <p className="text-sm text-gray-500">From: {item.country}</p>
                )}

                <p className="text-xs text-gray-400">
                  Auction Ended: {new Date(item.auction_end_at).toLocaleDateString()}
                </p>

                {item.winner ? (
                  <p className="text-xs text-green-600 font-medium">
                    Winner: {item.winner.name}
                  </p>
                ) : (
                  <p className="text-xs text-red-500">No Winner Assigned</p>
                )}

                <Link
                  to={`/auction-details/${item.slug}`}
                  className="mt-2 inline-block text-center text-sm text-white bg-black px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {!isLoading && CompletedProduct?.data?.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No completed auctions found</p>
        </div>
      )}
    </div>
  );
};

export default Completed;
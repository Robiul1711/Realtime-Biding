import React, { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/Title";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecentBidCard = ({ data, isLoading = false, isLoading1 = false }) => {
  const [showAll, setShowAll] = useState(false);

  // treat any loading flag as loading
  const loading = isLoading || isLoading1;

  // Show loading skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="border border-[#E5E5E5] rounded-lg p-3">
              <Skeleton height={200} />
              <Skeleton height={20} className="mt-3" />
              <Skeleton width={120} />
              <Skeleton width={80} />
            </div>
          ))}
      </div>
    );
  }

  // Normalize data into an array
  const visibleData = Array.isArray(data) ? data : [];

  // Show “no data” state
  if (!visibleData.length) {
    return (
      <div className="text-center py-10">
        <Title level="title14" className="text-gray-500">
          No recent bids found.
        </Title>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {visibleData.map((item, index) => (
          <Link
            to="/recent-won-details"
            key={index}
            className="border border-[#E5E5E5] rounded-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[280px] rounded-lg md:h-auto object-cover"
            />
            <div className="p-3 flex flex-col gap-1">
              <Title level="title12">{item.title}</Title>
              <Title level="title14" className="text-[#A8A8A8]">
                Last bid{" "}
                <span className="font-bold ml-2 text-black">{item.price}</span>
              </Title>
              <Title level="title12">{item.location}</Title>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && visibleData.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-[#4275F6] text-white rounded hover:bg-gray-800 transition"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentBidCard;

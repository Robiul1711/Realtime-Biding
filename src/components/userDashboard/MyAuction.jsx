import React, { useState } from "react";
import Title from "../common/Title";
import MyOwnBid from "./MyOwnBid";
import { Link, useLocation } from "react-router-dom";
import OnGoing from "../sellerDashboard/OnGoing";
import Completed from "../sellerDashboard/Completed";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyAuction = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const { pathname } = useLocation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["won-bids", user?.id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bids/auth/won`);
      return res.data;
    },
    enabled: !!user?.id,
  });

  // Skeleton loader for the My Won Bids section
  const renderSkeletonLoader = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton height={30} width={200} />
        <Skeleton height={20} width={400} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <Skeleton height={200} className="mb-4" />
            <Skeleton height={20} width="80%" className="mb-2" />
            <Skeleton height={20} width="60%" className="mb-2" />
            <Skeleton height={20} width="40%" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {pathname === "/user-dashboard/my-auction" ? (
        <div>
          {isLoading ? (
            renderSkeletonLoader()
          ) : isError ? (
            <div className="text-center py-10 text-red-500">
              Failed to load won bids. Please try again later.
            </div>
          ) : data?.data?.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-gray-500 text-lg mb-4">
                You haven't won any bids yet.
              </div>
              <Link
                to="/auction-list"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Browse available auctions →
              </Link>
            </div>
          ) : (
            <>
              <Title level="title24" className="font-semibold text-black">
                My Won Bids
              </Title>
              <Title
                level="title16"
                className="text-[#4E657F] max-w-[500px] mt-2 mb-10"
              >
                Congratulations! 🎉 These are the items you've successfully won
                through bidding.
              </Title>
              <MyOwnBid />
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {isLoading ? <Skeleton width={250} /> : "My Auction History"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isLoading ? (
                <Skeleton width={400} />
              ) : (
                "Review all your past auction in one place. Stay informed about your auction activity and outcomes."
              )}
            </p>
          </div>
          {isLoading ? (
            <Skeleton width={150} height={40} />
          ) : (
            <Link
              to="/seller-dashboard/create-listing"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
            >
              Create an auction
            </Link>
          )}
        </div>
      )}

      {pathname === "/seller-dashboard/my-auction" && (
        <div className="flex gap-4 text-black border-b border-[#E5E5E5] mb-10">
          {isLoading ? (
            <>
              <Skeleton width={80} height={30} />
              <Skeleton width={80} height={30} />
            </>
          ) : (
            <>
              <button
                className={`cursor-pointer font-semibold pb-2 ${
                  activeTab === "ongoing"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("ongoing")}
              >
                On going
              </button>
              <button
                className={`cursor-pointer font-semibold pb-2 ${
                  activeTab === "completed"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
            </>
          )}
        </div>
      )}

      {pathname !== "/user-dashboard/my-auction" && (
        <div>
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <Skeleton height={150} className="mb-4" />
                  <Skeleton height={20} width="70%" className="mb-2" />
                  <Skeleton height={20} width="50%" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {activeTab === "ongoing" && <OnGoing />}
              {activeTab === "completed" && <Completed />}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAuction;

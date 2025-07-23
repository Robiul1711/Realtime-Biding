/* eslint-disable no-unused-vars */
import React from "react";
import SellerRecentAuction from "./SellerRecentAuction";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ShoppingBag,
  Calendar,
  DollarSign,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const SellerDashboard = () => {
  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
        </div>
        <div
          className={`p-3 rounded-full ${
            color === "blue"
              ? "bg-blue-50"
              : color === "green"
              ? "bg-green-50"
              : "bg-purple-50"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              color === "blue"
                ? "text-blue-600"
                : color === "green"
                ? "text-green-600"
                : "text-purple-600"
            }`}
          />
        </div>
      </div>
    </div>
  );

  // api
  const axiosPublic = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["seller-dashboard"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/seller/dashboard/index`);
      return res.data;
    },
  });
  const reletedactiondata = data?.recentAuctions;
  const topbidderdata = data?.topBidder;
  const overviewData = data?.dailyData
    ? Object.entries(data.dailyData).map(([dateStr, value]) => ({
        name: format(new Date(dateStr), "MMM d"), // "Jul 1", "Jul 12"
        value,
      }))
    : [];

  const earningsData = data?.earning
    ? Object.entries(data.earning).map(([month, value]) => ({
        name: month,
        value,
      }))
    : [];

  return (
    <div>
      <div className="rounded-2xl sm:bg-gray-50  sm:p-6">
        <div className="">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                My Auction History
              </h1>
              <p className="text-gray-600 mt-1">
                Review all your past auction in one place. Stay informed about
                your auction activity and outcomes.
              </p>
            </div>
            <Link
              to="/seller-dashboard/create-listing"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
            >
              Create an auction
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <StatCard
              icon={ShoppingBag}
              title="Total Auction Listings"
              value={data?.auctionsAll}
              color="blue"
            />
            <StatCard
              icon={Calendar}
              title="Ongoing Auction"
              value={data?.auctionsOnGoing}
              color="blue"
            />
            <StatCard
              icon={DollarSign}
              title="Total Earnings"
              value={data?.totalEarning}
              color="purple"
            />
            <StatCard
              icon={CheckCircle}
              title="Items Sold"
              value={data?.soldItems}
              color="green"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Top Auction Overview */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Top Auction Overview
              </h3>
              <p className="text-sm text-gray-500 mb-4">Apr 30 - May 1</p>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={overviewData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      fill="url(#gradient)"
                      dot={false}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Bidder */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Top Bidder
              </h3>
              <div className="space-y-4">
                {topbidderdata?.slice(0, 4).map((bidder, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {bidder?.user?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {bidder?.user?.country}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={topbidderdata}>
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#10B981"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${bidder.max_bid}
                        </p>
                        <TrendingUp className="w-4 h-4 text-green-500 ml-auto" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earning Performance */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Earning Performance
              </h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={earningsData}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      fontSize={12}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-blue-600 font-medium">4,890</span>
                <span className="text-gray-500 ml-2">Low earning in March</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <SellerRecentAuction reletedactiondata={reletedactiondata} />
      </div>
    </div>
  );
};

export default SellerDashboard;

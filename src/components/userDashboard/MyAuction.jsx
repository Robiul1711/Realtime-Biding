import React, { useState } from "react";
import Title from "../common/Title";
import MyOwnBid from "./MyOwnBid";
import { useLocation } from "react-router-dom";
import OnGoing from "../sellerDashboard/OnGoing";
import Completed from "../sellerDashboard/Completed";

const MyAuction = () => {
   const [activeTab, setActiveTab] = useState("ongoing"); // default tab
  const { pathname } = useLocation();
  return (
    <div>
      {pathname === "/user-dashboard/my-auction" ? (
        <div>
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
        </div>
      ) : (
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Auction History
            </h1>
            <p className="text-gray-600 mt-1">
              Review all your past auction in one place. Stay informed about
              your auction activity and outcomes.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Create an auction
          </button>
        </div>
      )}
 <div className="flex gap-4 text-black border-b border-[#E5E5E5] mb-10 ">
        <p
          className={`cursor-pointer font-semibold  ${
            activeTab === "ongoing" ? "text-blue-600 border-b border-blue-600" : ""
          }`}
          onClick={() => setActiveTab("ongoing")}
        >
          On going
        </p>
        <p
          className={`cursor-pointer font-semibold ${
            activeTab === "completed" ? "text-blue-600 border-b border-blue-600" : ""
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </p>
      </div>

      <div>
        {activeTab === "ongoing" && <OnGoing />}
        {activeTab === "completed" && <Completed />}
      </div>
    </div>
  );
};

export default MyAuction;

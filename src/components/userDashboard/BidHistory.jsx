import React from "react";
import Title from "../common/Title";
import BidsTable from "./BidsTable";
import { useLocation } from "react-router-dom";

const BidHistory = () => {
  const {pathname} = useLocation();
  return (
    <div>
      <Title level="title24" className="font-semibold text-black">
       {
        pathname === '/user-dashboard/bid-history' ? ' My Bid History' : 'My Auction History'
       }
      </Title>
      <Title level="title16" className=" text-[#4E657F] mt-2 mb-5">
        Review all your past bids in one place. Stay informed about your bidding
        activity and outcomes.
      </Title>
      <div>
        <BidsTable />
      </div>
    </div>
  );
};

export default BidHistory;

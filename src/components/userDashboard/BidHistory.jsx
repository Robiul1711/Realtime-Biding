import React from "react";
import Title from "../common/Title";
import BidsTable from "./BidsTable";

const BidHistory = () => {
  return (
    <div>
      <Title level="title24" className="font-semibold text-black">
        My Bid History
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

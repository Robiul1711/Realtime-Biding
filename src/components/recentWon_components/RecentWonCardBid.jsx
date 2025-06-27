import React from "react";
import man from "../../assets/images/man.png";

const RecentWonCardBid = () => {
  return (
    <div className="border border-[#D0D0D0] p-5 rounded-lg  ">
      <h2 className="text-lg md:text-2xl font-semibold text-[#A1A1A1] text-center mb-2">
        Current Bid
      </h2>
      <p className="text-2xl md:text-4xl lg:text-[48px] font-semibold text-[#000000] text-center my-6">
        $24,500
      </p>
      <hr className="border border-[#D0D0D0]" />
      <div className="my-6">
        <h2 className="text-[#000000] text-lg md:text-2xl font-semibold my-4 border-b-2 pb-3">
          All Bids
        </h2>
        <div className="flex justify-between items-center my-6 border-b pb-3">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 rounded-full" src={man} alt="image" />
            <div>
              <h2 className="text-[#0C0D19] mb-1 text-[15px]"> Alex M.</h2>
              <p className="text-[#A8A8A8] text-[13px]">2 Mins ago</p>
            </div>
          </div>
          <p className="text-[15px] text-[#0C0D19] font-semibold">$24,500</p>
        </div>
        <div className="flex justify-between items-center my-6 border-b pb-3">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 rounded-full" src={man} alt="image" />
            <div>
              <h2 className="text-[#0C0D19] mb-1 text-[15px]"> Alex M.</h2>
              <p className="text-[#A8A8A8] text-[13px]">2 Mins ago</p>
            </div>
          </div>
          <p className="text-[15px] text-[#0C0D19] font-semibold">$24,500</p>
        </div>
        <div className="flex justify-between items-center my-6 border-b pb-3">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 rounded-full" src={man} alt="image" />
            <div>
              <h2 className="text-[#0C0D19] mb-1 text-[15px]"> Alex M.</h2>
              <p className="text-[#A8A8A8] text-[13px]">2 Mins ago</p>
            </div>
          </div>
          <p className="text-[15px] text-[#0C0D19] font-semibold">$24,500</p>
        </div>
        <div className="flex justify-between items-center my-6 border-b pb-3">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 rounded-full" src={man} alt="image" />
            <div>
              <h2 className="text-[#0C0D19] mb-1 text-[15px]"> Alex M.</h2>
              <p className="text-[#A8A8A8] text-[13px]">2 Mins ago</p>
            </div>
          </div>
          <p className="text-[15px] text-[#0C0D19] font-semibold">$24,500</p>
        </div>
        <div className="flex justify-between items-center my-6 border-b pb-3">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 rounded-full" src={man} alt="image" />
            <div>
              <h2 className="text-[#0C0D19] mb-1 text-[15px]"> Alex M.</h2>
              <p className="text-[#A8A8A8] text-[13px]">2 Mins ago</p>
            </div>
          </div>
          <p className="text-[15px] text-[#0C0D19] font-semibold">$24,500</p>
        </div>
        <div className="flex justify-between items-center my-6 border-b pb-3">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 rounded-full" src={man} alt="image" />
            <div>
              <h2 className="text-[#0C0D19] mb-1 text-[15px]"> Alex M.</h2>
              <p className="text-[#A8A8A8] text-[13px]">2 Mins ago</p>
            </div>
          </div>
          <p className="text-[15px] text-[#0C0D19] font-semibold">$24,500</p>
        </div>
        <div className="flex justify-between items-center my-6 border-b pb-3">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 rounded-full" src={man} alt="image" />
            <div>
              <h2 className="text-[#0C0D19] mb-1 text-[15px]"> Alex M.</h2>
              <p className="text-[#A8A8A8] text-[13px]">2 Mins ago</p>
            </div>
          </div>
          <p className="text-[15px] text-[#0C0D19] font-semibold">$24,500</p>
        </div>
      </div>
    </div>
  );
};

export default RecentWonCardBid;

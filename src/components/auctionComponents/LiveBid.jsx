import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import man from "../../assets/images/man.png";

const LiveBid = () => {
  const [countValue, setCountValue] = useState("$250");

  const getNumericValue = (val) => parseInt(val.replace(/[^0-9]/g, "")) || 0;

  const handleIncrement = () => {
    const numeric = getNumericValue(countValue);
    setCountValue(`$${numeric + 1}`);
  };

  const handleDecrement = () => {
    const numeric = getNumericValue(countValue);
    setCountValue(`$${Math.max(numeric - 1, 0)}`);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    const numeric = getNumericValue(val);
    setCountValue(val.startsWith("$") ? `$${numeric}` : `$${numeric}`);
  };
  return (
    <div className="border border-[#D0D0D0] p-5 rounded-lg  ">
      <h2 className="text-lg md:text-2xl font-semibold text-[#A1A1A1] text-center mb-2">
        Current Bid
      </h2>
      <p className="text-2xl md:text-4xl lg:text-[48px] font-semibold text-[#000000] text-center my-6">
        $24,500
      </p>

      <div className="bg-[#F3F6FE] p-5 rounded-lg my-3">
        <p className="text-center mb-2 text-[#595858] md:text-[22px]">
          Time Left
        </p>
        <div className="flex justify-between items-center italic px-16 py-2 text-[#242424]">
          <div>
            <p className="text-[20px] md:text-[30px] lg:text-[40px]">30</p>
            <p className="text-[14px] text-[#222222]">Hours</p>
          </div>
          <div>
            <p className="text-[20px] md:text-[30px] lg:text-[40px]">10</p>
            <p className="text-[14px] text-[#222222]">Min</p>
          </div>
          <div>
            <p className="text-[20px] md:text-[30px] lg:text-[40px]">30</p>
            <p className="text-[14px] text-[#222222]">sec</p>
          </div>
        </div>
      </div>

      <div className="my-6">
        <h2 className="text-[#000000] text-lg md:text-2xl font-semibold my-4">
          Your Bid Amount
        </h2>
        <div className="flex items-center gap-4 w-full overflow-hidden mb-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 md:py-3.5 border rounded-lg text-gray-700 bg-white hover:bg-gray-100 dark:bg-slate-800 dark:text-[#abc2d3] hover:scale-105 transition-all duration-200 text-lg cursor-pointer"
          >
            <FiMinus />
          </button>

          <input
            type="text"
            value={countValue}
            onChange={handleInputChange}
            className="flex-1 text-center py-2 md:py-3.5 border rounded-lg text-lg outline-none dark:bg-transparent dark:text-[#abc2d3] bg-white"
          />

          <button
            onClick={handleIncrement}
            className="px-4 py-2 md:py-3.5 border rounded-lg text-gray-700 bg-white hover:bg-gray-100 dark:bg-slate-800 dark:text-[#abc2d3] hover:scale-105 transition-all duration-200 text-lg cursor-pointer"
          >
            <FiPlus />
          </button>
        </div>
        <button className="bg-[#4275F6] text-white py-2 md:py-3.5 rounded-xl w-full hover:bg-[#4275F9] transition-all duration-300 text-sm font-medium cursor-pointer">
          Start Now
        </button>
      </div>

      <div className="my-6">
        <h2 className="text-[#000000] text-lg md:text-2xl font-semibold my-4 border-b-2 pb-3">
          Recent Bids
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
      </div>
    </div>
  );
};

export default LiveBid;

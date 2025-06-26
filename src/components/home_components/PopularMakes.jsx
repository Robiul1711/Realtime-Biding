import React, { useState } from "react";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import car2 from "../../assets/images/car2.png";
import { CiBookmark } from "react-icons/ci";
const PopularMakes = () => {
  const [bookmarked, setBookmarked] = useState([]);

  const toggleBookmark = (index) => {
    setBookmarked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <div className="section-padding-x py-20 bg-[#001767] text-white">
      <div className="flex justify-between items-center mb-5">
        <Title level="title40">Popular Makes</Title>
        <p className="flex items-center gap-2">
          View All <FiArrowUpRight className="text-2xl" />
        </p>
      </div>
      <div className="border-b border-gray-600 pb-4 mb-6 flex gap-8 ">
        <p>All</p>
        <p>Fashion</p>
        <p>Motors</p>
        <p>Electronics</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="bg-[#FFFFFF29]/50 rounded-lg shadow">
              <div className="relative">
                <img
                  src={car2}
                  alt="Car 2"
                  className="w-full h-auto rounded-lg mb-2"
                />
                <button
                  onClick={() => toggleBookmark(i)}
                  className="absolute top-2 right-2 text-black p-2.5 text-2xl bg-white rounded-full"
                >
                  <CiBookmark
                    className={`transition-all !text-black ${
                      bookmarked.includes(i)
                        ? "fill-[#FB0000]"
                        : "fill-[#050B20]"
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  Yugioh Speed Duel Battle City FINALS Brand New Factory Sealed
                </h3>
                <p className="text-xs text-red-700 font-bold">Pre-Owned</p>
                <div className="flex justify-between items-center mt-3 mb-1">
                  <p className="text-lg font-bold">$15,000</p>
                  <p className="text-sm text-gray-300">
                    lostrav_6599.5% positive (595)
                  </p>
                </div>
                <p className="font-bold text-xs py-1.5">
                  <span className="text-red-700">0 bids </span>· Time Ended
                  (Today 11:50 AM)
                </p>
                <div className="flex flex-col gap-2 text-xs">
                  <p className="text-gray-300">+$19.15 delivery</p>
                  <p className="text-gray-300">from Australia</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularMakes;

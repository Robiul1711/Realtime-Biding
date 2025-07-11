import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import man from "../../assets/images/man.png";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

dayjs.extend(duration);

const LiveBid = ({ productDetails, isLoading }) => {
  const auctionEndAt = productDetails?.auction_end_at;
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

  const calculateTimeLeft = () => {
    if (isLoading) return { hours: "00", minutes: "00", seconds: "00" };

    const now = dayjs();
    const end = dayjs(auctionEndAt);
    const diff = end.diff(now);

    if (diff <= 0 || !auctionEndAt) {
      return { hours: "00", minutes: "00", seconds: "00" };
    }

    const d = dayjs.duration(diff);
    return {
      hours: String(d.hours()).padStart(2, "0"),
      minutes: String(d.minutes()).padStart(2, "0"),
      seconds: String(d.seconds()).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [auctionEndAt, isLoading]);

  return (
    <div className="border border-[#D0D0D0] p-5 rounded-lg">
      {/* Current Bid Section */}
      <h2 className="text-lg md:text-2xl lg:text-xl xl:text-2xl font-semibold text-[#A1A1A1] text-center mb-2">
        {isLoading ? <Skeleton width={120} /> : "Current Bid"}
      </h2>
      <p className="text-2xl md:text-4xl lg:text-2xl xl:text-4xl font-semibold text-[#000000] text-center my-3 xl:my-6">
        {isLoading ? <Skeleton width={150} /> : "$24,500"}
      </p>

      {/* Time Left Section */}
      <div className="bg-[#F3F6FE] p-5 rounded-lg">
        <p className="text-center mb-2 text-[#595858] md:text-[22px]">
          {isLoading ? <Skeleton width={100} /> : "Time Left"}
        </p>
        <div className="flex justify-between w-full items-center italic xl:px-16 py-2 text-[#242424]">
          {["hours", "minutes", "seconds"].map((key, idx) => (
            <div key={idx}>
              <p className="text-[20px] md:text-[30px] xl:text-[40px]">
                {isLoading ? <Skeleton width={40} /> : timeLeft[key]}
              </p>
              <p className="text-[14px] text-[#222222]">
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  key.charAt(0).toUpperCase() + key.slice(1)
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Your Bid Amount Section */}
      <div className="my-3 xl:my-6">
        <h2 className="text-[#000000] text-lg md:text-2xl font-semibold my-4">
          {isLoading ? <Skeleton width={150} /> : "Your Bid Amount"}
        </h2>
        {isLoading ? (
          <Skeleton height={40} className="mb-4" />
        ) : (
          <div className="flex items-center gap-2 xl:gap-4 w-full overflow-hidden mb-4">
            <button
              onClick={handleDecrement}
              className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 text-gray-700"
            >
              <FiMinus />
            </button>
            <input
              type="text"
              value={countValue}
              onChange={handleInputChange}
              className="flex-1 text-center px-4 py-2 border rounded-lg bg-white"
            />
            <button
              onClick={handleIncrement}
              className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 text-gray-700"
            >
              <FiPlus />
            </button>
          </div>
        )}
        {isLoading ? (
          <Skeleton height={45} />
        ) : (
          <button className="bg-[#4275F6] text-white py-2 lg:py-3 xl:py-3.5 rounded-xl w-full hover:bg-[#4278F9] transition-all duration-300">
            Start Now
          </button>
        )}
      </div>

      {/* Recent Bids Section */}
      <div className="my-3 xl:my-6">
        <h2 className="text-[#000000] text-lg md:text-2xl font-semibold my-4 border-b-2 pb-3">
          {isLoading ? <Skeleton width={120} /> : "Recent Bids"}
        </h2>
        {isLoading
          ? Array(4)
              .fill()
              .map((_, i) => (
                <div key={i} className="flex justify-between items-center my-6 border-b pb-3">
                  <div className="flex items-center gap-4">
                    <Skeleton circle width={48} height={48} />
                    <div>
                      <Skeleton width={80} height={20} className="mb-1" />
                      <Skeleton width={60} height={16} />
                    </div>
                  </div>
                  <Skeleton width={60} height={20} />
                </div>
              ))
          : [1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex justify-between items-center my-6 border-b pb-3">
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full" src={man} alt="Bidder" />
                  <div>
                    <h2 className="text-[#0C0D19] mb-1 text-[15px]">Alex M.</h2>
                    <p className="text-[#A8A8A8] text-[13px]">2 Mins ago</p>
                  </div>
                </div>
                <p className="text-[15px] text-[#0C0D19] font-semibold">$24,500</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default LiveBid;
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const LiveAuctions = () => {
  const axiosPublic = useAxiosPublic();
  const [timeLeft, setTimeLeft] = useState({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const response = await axiosPublic.get("/auctions/popular");
      return response.data;
    },
  });

  useEffect(() => {
    if (!data?.data) return;

    const calculateTimeLeft = () => {
      const newTimeLeft = {};

      data.data.forEach((item) => {
        if (item.auction_end_at) {
          const endDate = new Date(item.auction_end_at);
          const now = new Date();
          const difference = endDate - now;

          if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            newTimeLeft[item.id] = { days, hours, minutes, seconds };
          } else {
            newTimeLeft[item.id] = "Auction ended";
          }
        }
      });

      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [data]);

  if (isLoading) return <div className="bg-gray-100 py-20 text-center">Loading...</div>;
  if (error) return <div className="bg-gray-100 py-20 text-center">Error loading auctions</div>;

  return (
    <div className="bg-gray-100 py-20">
      <div className=" section-padding-x mx-auto px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="rounded-xl"
        >
          {data?.data?.map((item) => (
            <SwiperSlide key={item?.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center   rounded-xl ">
                {/* Left side - Content */}
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                    {item?.title}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {item?.description?.substring(0, 150)}...
                  </p>
                  
                  {/* Countdown Timer */}
                  {timeLeft[item?.id] && typeof timeLeft[item?.id] !== 'string' ? (
                    <div className="flex gap-4 py-4">
                      <div className="bg-white p-4 rounded-lg text-center min-w-[80px]">
                        <span className="text-2xl font-bold block">
                          {timeLeft[item?.id].days}
                        </span>
                        <span className="text-sm text-gray-500">Days</span>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center min-w-[80px]">
                        <span className="text-2xl font-bold block">
                          {timeLeft[item?.id].hours}
                        </span>
                        <span className="text-sm text-gray-500">Hours</span>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center min-w-[80px]">
                        <span className="text-2xl font-bold block">
                          {timeLeft[item?.id].minutes}
                        </span>
                        <span className="text-sm text-gray-500">Minutes</span>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center min-w-[80px]">
                        <span className="text-2xl font-bold block">
                          {timeLeft[item?.id].seconds}
                        </span>
                        <span className="text-sm text-gray-500">Seconds</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-500 font-medium">
                      {timeLeft[item?.id] || "Auction time not available"}
                    </p>
                  )}

                  <Link to={`/auction-details/${item?.slug}`} className="bg-red-600  w-[140px] hover:bg-red-700 text-white py-3 px-6 rounded-full flex items-center gap-2 transition-colors">
                    Bid Now <FiArrowUpRight className="text-lg" />
                  </Link>
                </div>

                {/* Right side - Image */}
                <div className="flex justify-center">
                  {item.images?.[0] && (
                    <img
                      src={`${import.meta.env.VITE_IMG_URL + item?.images[0]}`}
                      alt={item?.title}
                      className="w-full h-64 md:h-80 lg:h-96 object-contain rounded-lg"
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LiveAuctions;
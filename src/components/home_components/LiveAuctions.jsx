import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner from "@/assets/images/auction.png";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const slides = [
  {
    image: banner,
    title: "Live Auctions Happening Now!xvxv",
    subtitle:
      "Bid in real-time, compete for the best deals, and win exclusive items before time runs out. Don't miss out—place your bid now!",
  },
  {
    image: banner,
    title: "Live Auctions Happening Now!",
    subtitle:
      "Bid in real-time, compete for the best deals, and win exclusive items before time runs out. Don't miss out—place your bid now!",
  },
  {
    image: banner,
    title: "Live Auctions Happening Now!",
    subtitle:
      "Bid in real-time, compete for the best deals, and win exclusive items before time runs out. Don't miss out—place your bid now!",
  },
];
const LiveAuctions = () => {
  const axiosPublic=useAxiosPublic();

  const { data} = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const response = await axiosPublic.get("/auctions/popular");
      return response.data;
    },
  });
console.log(data?.data)
  return (
    <div className="bg-black  xl:bg-[#efeeee] mb-5">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-[450px] md:h-[600px] xmd:h-[700px] xl:h-auto rounded-2xl object-cover"
              />

              <div className="absolute top-1/2 left-[5%] sm:left-[10%] transform -translate-y-1/2 px-4 sm:px-0">
                <h1 className="text-[32px] text-white xl:text-black sm:text-[48px] lg:text-[60px] xl:text-[72px] max-w-[90%] sm:max-w-[700px] w-full leading-tight font-bold">
                  {slide.title}
                </h1>

                <Title
                  level="title16"
                  className="text-[16px] sm:text-[20px] md:text-[24px] xl:text-[30px] max-w-[90%] sm:max-w-[700px] w-full mt-4 sm:mt-5 text-white xl:text-[#7C7C7C]"
                >
                  {slide.subtitle}
                </Title>

                <div className="py-6 sm:py-8 flex flex-wrap gap-4 items-center">
                  <div className="px-6 sm:px-10 py-3 sm:py-4 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg min-w-[80px]">
                    <h1 className="text-[24px] sm:text-[32px] md:text-[40px]">
                      30
                    </h1>
                    <p className="text-xs sm:text-sm">Hours</p>
                  </div>
                  <span className="h-10 w-[2px] bg-[#2c2b2b] hidden sm:inline-block"></span>

                  <div className="px-6 sm:px-10 py-3 sm:py-4 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg min-w-[80px]">
                    <h1 className="text-[24px] sm:text-[32px] md:text-[40px]">
                      45
                    </h1>
                    <p className="text-xs sm:text-sm">Minutes</p>
                  </div>
                  <span className="h-10 w-[2px] bg-[#2c2b2b] hidden sm:inline-block"></span>

                  <div className="px-6 sm:px-10 py-3 sm:py-4 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg min-w-[80px]">
                    <h1 className="text-[24px] sm:text-[32px] md:text-[40px]">
                      20
                    </h1>
                    <p className="text-xs sm:text-sm">Seconds</p>
                  </div>
                </div>

                <button className="bg-[#FB0000] text-white py-2 px-4 sm:px-6 mt-4 rounded-full cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                  Learn More <FiArrowUpRight className="text-lg sm:text-xl" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LiveAuctions;

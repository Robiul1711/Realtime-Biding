import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner from "@/assets/images/auction.png";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";

const LiveAuctions = () => {
  const slides = [
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
    {
      image: banner,
      title: "Live Auctions Happening Now!",
      subtitle:
        "Bid in real-time, compete for the best deals, and win exclusive items before time runs out. Don't miss out—place your bid now!",
    },
  ];

  return (
    <div className="bg-[#efeeee]">
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
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2">
                <h1 className="text-[72px] max-w-[700px] w-full leading-[1.2] font-bold">
                  {slide.title}
                </h1>
                <Title
                  level="title16"
                  className="text-[30px] max-w-[700px] w-full mt-5 text-[#7C7C7C]"
                >
                  {slide.subtitle}
                </Title>
                <div className="py-8 flex gap-4 items-center">
                  <div className="px-10 py-4 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg">
                    <h1 className="text-[40px]">30</h1>
                    <p className="text-sm">Hours</p>
                  </div>
                  <span className="h-10 w-1 bg-[#2c2b2b]"></span>
                  <div className="px-10 py-4 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg">
                    <h1 className="text-[40px]">45</h1>
                    <p className="text-sm">Minutes</p>
                  </div>
                  <span className="h-10 w-1 bg-[#2c2b2b]"></span>
                  <div className="px-10 py-4 bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg">
                    <h1 className="text-[40px]">20</h1>
                    <p className="text-sm">Seconds</p>
                  </div>
                </div>

                <button className="bg-[#FB0000] text-white py-2 px-4 mt-4 rounded-full cursor-pointer flex items-center gap-2">
                  Learn More <FiArrowUpRight className="text-xl" />
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

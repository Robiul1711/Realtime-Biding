import React, { useRef, useState } from "react";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import car2 from "../../assets/images/car2.png";
import { CiBookmark } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const PopularMakes = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookmarked, setBookmarked] = useState([]);

  const toggleBookmark = (index) => {
    setBookmarked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <div className="section-padding-x pb-20 pt-10 lg:py-20 bg-[#001767] text-white">
      <div className="flex justify-between items-center mb-5">
        <Title level="title40">Popular Makes</Title>
        <p className="flex items-center gap-2">
          View All <FiArrowUpRight className="text-2xl" />
        </p>
      </div>
      <div className="border-b border-gray-600 pb-4 mb-6 flex gap-8">
        {["All", "Fashion", "Motors", "Electronics"].map((category) => (
          <p
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`cursor-pointer pb-1 border-b-2 transition duration-200 ${
              activeCategory === category
                ? "border-[#3B9DF8] text-[#3B9DF8] font-semibold"
                : "border-transparent text-[#faf2f2]"
            }`}
          >
            {category}
          </p>
        ))}
      </div>

      <div className="relative my-6">
        <Swiper
          modules={[Navigation]}
          loop
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            375: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          className="pb-10"
        >
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <SwiperSlide key={i}>
                <div className="bg-[#FFFFFF29]/50 rounded-lg shadow">
                  <div className="relative">
                    <img
                      src={car2}
                      alt="Car"
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
                      Yugioh Speed Duel Battle City FINALS Brand New Factory
                      Sealed
                    </h3>
                    <p className="text-xs text-red-700 font-bold">Pre-Owned</p>
                    <div className="flex justify-between items-center gap-2 mt-3 mb-1">
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
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="absolute -bottom-16 left-2 flex gap-3 z-10">
          <button
            ref={prevRef}
            className="bg-white p-2.5 rounded-full shadow hover:bg-gray-200 cursor-pointer"
          >
            <svg width="16" height="16" fill="currentColor">
              <path
                d="M11 2L4 8l7 6"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>
          <button
            ref={nextRef}
            className="bg-white p-2.5 rounded-full shadow hover:bg-gray-100 cursor-pointer"
          >
            <svg width="16" height="16" fill="currentColor">
              <path
                d="M5 2l7 6-7 6"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularMakes;

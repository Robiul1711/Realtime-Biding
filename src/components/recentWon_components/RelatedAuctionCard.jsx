import React, { useRef, useState } from "react";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import car2 from "../../assets/images/car2.png";
import { CiBookmark } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const RelatedAuctionCard = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [bookmarked, setBookmarked] = useState([]);

  const toggleBookmark = (index) => {
    setBookmarked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <div className="section-padding-x py-10 md:py-20 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Title level="title40" className="text-black">
          Related Auction
        </Title>
      </div>

      <div className="relative my-4 md:my-6">
        <Swiper
          modules={[Navigation]}
          loop
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            375: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
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
          className="pb-14"
        >
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <SwiperSlide key={i}>
                <div className="bg-[#001767] rounded-lg shadow overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={car2}
                      alt="Car"
                      className="w-full h-auto rounded-t-lg object-cover"
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
                  <div className="p-4 flex flex-col justify-between h-full">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      Yugioh Speed Duel Battle City FINALS Brand New Factory
                      Sealed
                    </h3>
                    <p className="text-xs text-red-700 font-bold mb-1">
                      Pre-Owned
                    </p>
                    <div className="flex justify-between items-center mt-2 mb-1 text-xs sm:text-sm">
                      <p className="text-base font-bold">$15,000</p>
                      <p className="text-gray-300">
                        lostrav_6599.5% positive (595)
                      </p>
                    </div>
                    <p className="font-bold text-xs py-1.5">
                      <span className="text-red-700">0 bids </span>· Time Ended
                      (Today 11:50 AM)
                    </p>
                    <div className="flex flex-col gap-1 text-xs text-gray-300">
                      <p>+$19.15 delivery</p>
                      <p>from Australia</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div className="absolute -bottom-14 left-2 flex gap-3 z-10">
          <button
            ref={prevRef}
            className="bg-white p-2.5 border border-black rounded-full shadow hover:bg-gray-200 cursor-pointer"
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
            className="bg-white p-2.5 border border-black rounded-full shadow hover:bg-gray-100 cursor-pointer"
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

export default RelatedAuctionCard;

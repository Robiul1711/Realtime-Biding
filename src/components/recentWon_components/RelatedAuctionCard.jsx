import React, { useRef, useState } from "react";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RelatedAuctionCard = ({ data = [], isLoading2 = false }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [bookmarked, setBookmarked] = useState([]);

  const toggleBookmark = (index) => {
    setBookmarked((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const skeletonSlides = Array(4).fill(null);

  if (!isLoading2 && data.length === 0) {
    return (
      <div className="section-padding-x pb-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Title level="title40" className="text-black">
            Related Auction
          </Title>
        </div>
        <p className="text-center text-gray-500 pt-4">
          No related auctions found.
        </p>
      </div>
    );
  }

  return (
    <div className="section-padding-x pb-8 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Title level="title40" className="text-black">
          Related Auction
        </Title>
      </div>

      <div className="relative my-4 md:my-6">
        <Swiper
          modules={[Navigation]}
          loop={!isLoading2 && data.length > 0}
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
          {isLoading2
            ? skeletonSlides.map((_, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-[#001767] rounded-lg shadow overflow-hidden h-full">
                    <Skeleton height={180} className="w-full" />
                    <div className="p-4 flex flex-col gap-2">
                      <Skeleton height={20} />
                      <Skeleton height={16} width={80} />
                      <Skeleton height={20} width={120} />
                      <Skeleton height={14} width={100} />
                      <Skeleton height={14} width={60} />
                      <Skeleton height={14} width={100} />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : data.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-[#001767] rounded-lg shadow overflow-hidden h-full">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
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
                        {item.title}
                      </h3>
                      <p className="text-xs text-red-700 font-bold mb-1">
                        {item.condition}
                      </p>
                      <div className="flex justify-between items-center mt-2 mb-1 text-xs sm:text-sm">
                        <p className="text-base font-bold">{item.price}</p>
                        <p className="text-gray-300">{item.sellerInfo}</p>
                      </div>
                      <p className="font-bold text-xs py-1.5">
                        <span className="text-red-700">{item.bids} bids </span>·{" "}
                        {item.time}
                      </p>
                      <div className="flex flex-col gap-1 text-xs text-gray-300">
                        <p>{item.delivery}</p>
                        <p>{item.location}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Navigation Arrows */}
        {!isLoading2 && data.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default RelatedAuctionCard;

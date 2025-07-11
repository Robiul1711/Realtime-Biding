import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HeartShape } from "../common/CustomIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const LiveDetails = ({ productDetails, isLoading }) => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const [liked, setLiked] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = productDetails?.images || [];

  return (
    <div>
      {/* Main Image Swiper */}
      {isLoading ? (
        <Skeleton height={540} className="w-full rounded-lg" />
      ) : (
        <Swiper
          loop
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 overflow-hidden rounded-lg"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-[280px] md:h-[400px] xl:h-[540px] object-cover cursor-pointer"
                src={VITE_IMG_URL + img}
                alt={`Main image ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Thumbnail Swiper */}
      {isLoading ? (
        <div className="flex gap-3 mt-6">
          <Skeleton height={110} width="32%" />
          <Skeleton height={110} width="32%" />
          <Skeleton height={110} width="32%" />
        </div>
      ) : (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper mt-6"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-[70px] md:h-[110px] object-cover cursor-pointer rounded-lg"
                src={VITE_IMG_URL + img}
                alt={`Thumbnail ${i}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Title and Like Button */}
      <div className="flex items-center justify-between my-2">
        {isLoading ? (
          <Skeleton width={200} height={40} />
        ) : (
          <p className="font-semibold text-[20px] md:text-[30px] lg:text-[40px] text-[#000000]">
            {productDetails?.title}
          </p>
        )}
        {isLoading ? (
          <Skeleton circle width={40} height={40} />
        ) : (
          <button
            onClick={() => setLiked(!liked)}
            className="transition-transform duration-200 active:scale-90"
          >
            <HeartShape filled={liked} />
          </button>
        )}
      </div>

      {/* Description */}
      {isLoading ? (
        <>
          <Skeleton count={3} />
          <Skeleton width="80%" />
        </>
      ) : (
        <p className="text-[#878787] md:text-lg lg:text-xl">
          {productDetails?.description}
        </p>
      )}

      {/* Properties */}
      <div className="my-6 grid grid-cols-1 xs:grid-cols-2 gap-6">
        {isLoading
          ? Array(4)
              .fill()
              .map((_, i) => (
                <div key={i} className="border p-5 rounded-lg">
                  <Skeleton width={100} />
                  <Skeleton width={150} />
                </div>
              ))
          : productDetails?.properties?.map((attr, index) => (
              <div key={index} className="border p-5 rounded-lg">
                <h1 className="text-[#0046F9]">{attr?.title}</h1>
                <p className="text-[#00103A] text-lg md:text-xl font-medium">
                  {attr?.value}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default LiveDetails;
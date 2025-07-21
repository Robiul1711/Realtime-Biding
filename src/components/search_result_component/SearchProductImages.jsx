import React, { useState } from "react";
import product from "../../assets/images/product.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";
import { FaAngleRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const SearchProductImages = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      <div className="flex items-center gap-1 text-gray-500 my-4">
        <span>Home</span>
        <FaAngleRight />

        {/* <FaAngleRight /> */}
        <span className="font-semibold">{product?.title}</span>
      </div>
      <Swiper
        loop
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="overflow-hidden rounded-lg"
      >
        {product?.images?.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-[260px] sm:h-[300px] md:h-[400px] xl:h-[540px] object-cover cursor-pointer"
              src={`${import.meta.env.VITE_IMG_URL + img}`}
              alt={`Product ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {product?.images?.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-[60px] md:h-[110px] object-cover cursor-pointer rounded-lg"
              src={`${import.meta.env.VITE_IMG_URL + img}`}
              alt={`Thumbnail ${i}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SearchProductImages;

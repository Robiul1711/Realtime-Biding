import React, { useState } from "react";
import live from "../../assets/images/live.png";
import live1 from "../../assets/images/live1.png";
import live2 from "../../assets/images/live2.png";
import live3 from "../../assets/images/live3.png";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const RecentWonCardDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = [live, live1, live2, live3];
  return (
    <div>
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
              className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-[300px] md:h-[400px] xl:h-[550px] object-cover cursor-pointer"
              src={img}
              alt={`Main image ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
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
              className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-[60px] md:h-[120px] object-cover cursor-pointer rounded-lg"
              src={img}
              alt={`Thumbnail ${i}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="font-semibold text-[20px] md:text-[30px] lg:text-[40px] text-[#000000] my-2">
        Vintage Rolex Submariner 1680
      </p>

      <p className="text-[#878787] md:text-lg lg:text-xl">
        A rare opportunity to own a piece of horological history. This vintage
        Rolex Submariner 1680 from 1978 is in exceptional condition, featuring
        the original dial and bezel. The watch has been professionally serviced
        and comes with full documentation and box. A rare opportunity to own a
        piece of horological history. This vintage Rolex Submariner 1680 from
        1978 is in exceptional condition, featuring the original dial and bezel.
        The watch has been professionally serviced and comes with full
        documentation and box.
      </p>
    </div>
  );
};

export default RecentWonCardDetails;

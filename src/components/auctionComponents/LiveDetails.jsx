import React, { useState } from "react";
import live from "../../assets/images/live.png";
import live1 from "../../assets/images/live1.png";
import live2 from "../../assets/images/live2.png";
import live3 from "../../assets/images/live3.png";
import { HeartShape } from "../common/CustomIcon";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const LiveDetails = () => {
  const [liked, setLiked] = useState(false);
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
              className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-auto md:h-[400px] xl:h-[550px] object-cover cursor-pointer"
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
              className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-[100px] object-cover cursor-pointer rounded-lg"
              src={img}
              alt={`Thumbnail ${i}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-between my-2">
        <p className="font-semibold text-[20px] md:text-[30px] lg:text-[40px] text-[#000000]">
          Vintage Rolex Submariner 1680
        </p>
        <button
          onClick={() => setLiked(!liked)}
          className="transition-transform duration-200 active:scale-90"
        >
          <HeartShape filled={liked} />
        </button>
      </div>
      <p className="text-[#878787] md:text-lg lg:text-xl">
        A rare opportunity to own a piece of horological history. This vintage
        Rolex Submariner 1680 from 1978 is in exceptional condition, featuring
        the original dial and bezel. The watch has been professionally serviced
        and comes with full documentation and box.
      </p>
      <div className="my-6 grid grid-cols-1  md:grid-cols-2 gap-6">
        <div className="border p-5 rounded-lg">
          <h1 className="text-[#0046F9]">Condition</h1>
          <p className="text-[#00103A] text-lg md:text-xl font-medium">
            Excellent
          </p>
        </div>
        <div className="border p-5 rounded-lg">
          <h1 className="text-[#0046F9]">Condition</h1>
          <p className="text-[#00103A] text-lg md:text-xl font-medium">
            Excellent
          </p>
        </div>
        <div className="border p-5 rounded-lg">
          <h1 className="text-[#0046F9]">Reference</h1>
          <p className="text-[#00103A] text-lg md:text-xl font-medium">1680</p>
        </div>

        <div className="border p-5 rounded-lg">
          <h1 className="text-[#0046F9]">Movement</h1>
          <p className="text-[#00103A] text-lg md:text-xl font-medium">
            Automatic
          </p>
        </div>
        <div className="border p-5 rounded-lg">
          <h1 className="text-[#0046F9]">Case Size</h1>
          <p className="text-[#00103A] text-lg md:text-xl font-medium">40mm</p>
        </div>
        <div className="border p-5 rounded-lg">
          <h1 className="text-[#0046F9]">Box & Papers</h1>
          <p className="text-[#00103A] text-lg md:text-xl font-medium">Yes</p>
        </div>
      </div>
    </div>
  );
};

export default LiveDetails;

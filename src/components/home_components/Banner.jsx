import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner from "@/assets/images/banner.png";

const Banner = () => {
  const slides = [
    {
      image: banner,
      title: "Pokémon, I choose you!",
      subtitle: "Take charge of your destiny on Pokémon Day.",
    },
    {
      image: banner,
      title: "Gotta catch 'em all!",
      subtitle: "Join the adventure and be a Pokémon master.",
    },
    {
      image: banner,
      title: "Adventure Awaits!",
      subtitle: "Explore the world of Pokémon like never before.",
    },
  ];

  return (
    <div className="section-padding-x">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <div className="absolute w-full h-full top-0 left-0 bg-black opacity-50 rounded-2xl"></div>
              <img
                src={slide.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2">
                <h1 className="text-[72px] max-w-[700px] w-full leading-[0.8] font-bold text-white">
                  {slide.title}
                </h1>
                <p className="text-[30px] mt-5 text-white">{slide.subtitle}</p>
                <button className="bg-white text-black py-2 px-4 mt-4 rounded-full cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import banner from "@/assets/images/banner.png";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Banner = () => {
  const axiosPublic = useAxiosPublic();

  const { data: bannerData, isLoading } = useQuery({
    queryKey: ["banner-list"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/banners`);
      return res.data;
    },
  });

  // Default slides for skeleton loading
  const skeletonSlides = Array(3).fill({});

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
        {isLoading
          ? skeletonSlides.map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <div className="relative">
                  <Skeleton
                    height={300}
                    className="w-full h-[300px] sm:h-[350px] md:h-[550px] rounded-2xl"
                    baseColor="#f3f3f3"
                    highlightColor="#ecebeb"
                  />
                  <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2 w-[80%]">
                    <Skeleton
                      count={1}
                      height={60}
                      width="70%"
                      className="mb-4"
                      baseColor="#f3f3f3"
                      highlightColor="#ecebeb"
                    />
                    <Skeleton
                      count={1}
                      height={30}
                      width="50%"
                      className="mb-6"
                      baseColor="#f3f3f3"
                      highlightColor="#ecebeb"
                    />
                    <Skeleton
                      height={40}
                      width={120}
                      borderRadius={50}
                      baseColor="#f3f3f3"
                      highlightColor="#ecebeb"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))
          : bannerData?.data?.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <div className="absolute w-full h-full top-0 left-0 bg-black opacity-50 rounded-2xl"></div>
                  <img
                    src={`${import.meta.env.VITE_IMG_URL + slide.image}`}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-[300px] sm:h-[350px] md:h-[550px] object-cover rounded-2xl"
                    onError={(e) => {
                      e.target.src = banner;
                    }}
                  />
                  <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2">
                    <h1 className="text-3xl sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[72px] max-w-[700px] w-full leading-[0.8] font-bold text-white">
                      {slide.title}
                    </h1>
                    <p className="text-[20px] mb-6 md:text-[24px] lg:text-[28px] xl:text-[30px] mt-3 sm:mt-5 text-white">
                      {slide.sub_title}
                    </p>
                    {/* <Link
                      to={`#`}
                      className="bg-white text-black py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      Learn More
                    </Link> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default Banner;
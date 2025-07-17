import React from "react";
import Title from "../common/Title";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // if not already imported globally

const WelcomeTo = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["about-section-one"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/cms/about/section-one`);
      return res.data;
    },
  });

  const content = data?.data;

  return (
    <div className="section-padding-x py-8 md:py-12 flex flex-col items-center justify-center text-center">
      {/* Title */}
      <Title level="title64">
        {isLoading ? <Skeleton width={280} height={50} /> : content?.title}
      </Title>

      {/* Subtitle */}
      <Title level="title16" className="mt-4 max-w-[780px]">
        {isLoading ? (
          <Skeleton width={`100%`} height={20} count={2} />
        ) : (
          content?.sub_title
        )}
      </Title>

      {/* Description */}
      <Title level="title20" className="mt-4">
        {isLoading ? <Skeleton width={`60%`} height={18} /> : content?.description}
      </Title>

      {/* Image */}
      <div className="w-full mt-12 rounded-lg shadow-lg">
        {isLoading ? (
          <Skeleton height={300} borderRadius={12} />
        ) : (
          <img
            src={content?.image}
            alt="Welcome Banner"
            className="w-full rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default WelcomeTo;

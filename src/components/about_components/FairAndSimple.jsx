import React from "react";
import fair from "../../assets/images/fair.png";
import Title from "../common/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FairAndSimple = () => {
  const axiosPublic = useAxiosPublic();

  const { data: data1, isLoading: isLoading1 } = useQuery({
    queryKey: ["about-section-two"],
    queryFn: async () => {
      const res = await axiosPublic.get("/cms/about/section-two");
      return res.data;
    },
  });

  const { data: data2, isLoading: isLoading2 } = useQuery({
    queryKey: ["about-section-three"],
    queryFn: async () => {
      const res = await axiosPublic.get("/cms/about/section-three");
      return res.data;
    },
  });

  const { data: data3, isLoading: isLoading3 } = useQuery({
    queryKey: ["about-section-four"],
    queryFn: async () => {
      const res = await axiosPublic.get("/cms/about/section-four");
      return res.data;
    },
  });

  const isLoading = isLoading1 || isLoading2 || isLoading3;

  // Once all data is loaded, then map
  const sections = isLoading
    ? []
    : [
        {
          id: 1,
          tag: data1?.data?.button_text,
          title: data1?.data?.title,
          description: data1?.data?.description,
          image: data1?.data?.image || fair,
        },
        {
          id: 2,
          tag: data2?.data?.button_text,
          title: data2?.data?.title,
          description: data2?.data?.description,
          image: data2?.data?.image || fair,
        },
        {
          id: 3,
          tag: data3?.data?.button_text,
          title: data3?.data?.title,
          description: data3?.data?.description,
          image: data3?.data?.image || fair,
        },
      ];



  return (
    <section className="section-padding-x md:pb-14 bg-white">
      {isLoading
        ? [1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 mb-6 md:mb-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex flex-col gap-6 max-w-[700px] w-full">
                <Skeleton
                  width={120}
                  height={32}
                  borderRadius={999}
                  className="mb-2"
                />
                <Skeleton width="80%" height={48} className="mb-2" />
                <Skeleton count={3} width="100%" />
              </div>
              <div className="w-full md:w-auto">
                <Skeleton width={400} height={300} borderRadius={16} />
              </div>
            </div>
          ))
        : sections.map((section, index) => (
            <div
              key={section.id}
              className={`flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 mb-6 md:mb-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex flex-col gap-6 max-w-[700px] w-full">
                <span className="px-6 py-2 rounded-full text-[#0046F9] bg-[#0046F9]/10 border border-[#0046F9] inline-block w-fit text-sm font-medium">
                  {section.tag}
                </span>

                <Title level="title36" className="text-[#0046F9]">
                  {section.title}
                </Title>

                <p className="!text-black">{section.description}</p>
              </div>

              <div className="w-full md:w-auto">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
    </section>
  );
};

export default FairAndSimple;

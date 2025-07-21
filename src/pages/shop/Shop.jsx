import FilterCard from "@/components/auctionComponents/FilterCard";
import BigDeal from "@/components/home_components/BigDeal";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import { ScrollRestoration } from "react-router-dom";
import SimpleProdcutCard from "./SimpleProdcutCard";

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => axiosPublic.get("/sales"),
  });

  console.log(products?.data?.data)
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const isMobile = window.innerWidth < 768;

    if (isFilterOpen && isMobile) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isFilterOpen]);

  return (
    <div
      className={`relative ${isFilterOpen ? "overflow-hidden h-screen" : ""}`}
    >
      <ScrollRestoration />
      <div className="md:hidden flex justify-end px-4 mt-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          <FiFilter className="text-xl" />
          Filter
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-10 section-padding-x py-4 lg:py-10 xl:py-20">
        <div className="hidden md:block w-full md:w-[30%]">
          <FilterCard />
        </div>
        <div className="w-full md:flex-1">
          <SimpleProdcutCard products={products?.data?.data} isLoading={isLoading} />
        </div>
      </div>

      <BigDeal />
      <div
        onClick={() => setIsFilterOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isFilterOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-14 sm:top-16 left-0 z-50 h-full pb-24 w-[80%] max-w-md bg-white shadow-lg border-t transition-transform duration-300 ease-in-out md:hidden ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={() => setIsFilterOpen(false)}>
            <FiX className="text-2xl" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          <FilterCard />
        </div>
      </div>
    </div>
  );
};

export default Shop;

import React from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import SearchProductImages from "./SearchProductImages";
import SearchProductText from "./SearchProductText";
import SimilarProduct from "./SimilarProduct";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const SearchProductDetails = () => {
  const { slug } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: productDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shop-product-details", slug], // Added slug to queryKey for proper caching
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${slug}`);
      return res?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading product details</p>
      </div>
    );
  }

  if (!productDetails?.data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Product not found</p>
      </div>
    );
  }
  console.log(productDetails)

  return (
    <div>
      <ScrollRestoration />
      <div className="flex flex-col lg:flex-row justify-between gap-8 w-full section-padding-x py-10">
        <div className="w-full lg:w-[60%]">
          <SearchProductImages product={productDetails.data} />
        </div>
        <div className="w-full lg:w-[38%] mt-4 lg:mt-12">
          <SearchProductText product={productDetails.data} />
        </div>
      </div>
      <SimilarProduct id={productDetails?.data?.category_id} />
    </div>
  );
};

export default SearchProductDetails;

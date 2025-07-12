import React from "react";

import Title from "../common/Title";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const MyWishListCard = ({ bookmark, isLoading }) => {
  console.log(bookmark?.data?.data);
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {bookmark?.data?.data?.map((item, index) => {
  const product = item.product;
  if (!product) return null; // Defensive: skip if product is null

  return (
    <div
      key={index}
      className="border border-[#E5E5E5] bg-white text-black rounded-lg"
    >
      <img
        src={VITE_IMG_URL + product.images?.[0]}
        alt={product.title}
        className="w-full object-cover"
      />
      <div className="p-3 flex flex-col gap-1">
        <div className="flex justify-between items-center">
        <Title level="title12">{product.title}</Title>
          <span className="text-[#F00]">
            <FaHeart />
          </span>
        </div>
        <div className="flex justify-between">
          <Title level="title14" className="text-[#A8A8A8]">
            Your bid{" "}
            <span className="font-bold ml-2 text-black">{product.bid}</span>
          </Title>
        </div>
        <Title level="title12">
          <span className="text-[#F00]">{product.bids?.length || 0} bids</span>
        </Title>
        <Title level="title12">From {product.country}</Title>
      </div>
    </div>
  );
})}

        </div>
      </div>
    </div>
  );
};

export default MyWishListCard;

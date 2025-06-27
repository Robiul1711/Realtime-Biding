import React from "react";
import star from "../../assets/images/star.png";
import starw from "../../assets/images/starw.png";
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Accordion from "../common/Accordian";

const SearchProductText = () => {
  return (
    <div>
      <p className="text-[#000000] border py-1 mb-2 rounded-full uppercase w-[150px] text-center">
        baseball
      </p>
      <h3 className="text-[#000000] text-2xl md:text-4xl lg:text-[60px] font-semibold my-2">
        1981 Pro Bowl Golfer Hat
      </h3>
      <div className="flex items-center gap-4">
        <p className="text-lg md:text-2xl lg:text-[40px] text-[#C3C3C3] font-semibold">
          $50.00
        </p>
        <div className="flex items-center gap-2">
          <img src={star} alt=" star" />
          <img src={star} alt=" star" />
          <img src={star} alt=" star" />
          <img src={star} alt=" star" />
          <img src={starw} alt=" star" />
        </div>
        <p>100 reviews</p>
      </div>
      <div className="my-4 flex items-center gap-6 w-full">
        <button className="px-6 py-2 md:py-3 w-full text-center hover:bg-[#0046F9] hover:text-[#F3F6FE] border text-[#000000] rounded-full flex items-center gap-2">
          <IoIosHeartEmpty size={24} className="hover:fill-[#FFF] " /> Add to
          wishlist
        </button>
        <button className="px-6 py-2 md:py-3 w-full text-center hover:bg-[#0046F9] hover:text-[#F3F6FE] border text-[#000000] rounded-full flex items-center gap-2">
          <HiOutlineShoppingBag size={24} className="hover:fill-[#FFF] " /> Add
          to wishlist
        </button>
      </div>
      <Accordion />
    </div>
  );
};

export default SearchProductText;

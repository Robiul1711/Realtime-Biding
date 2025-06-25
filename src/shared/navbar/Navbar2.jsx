import React from "react";
import Logo from "@/assets/images/logo.png";
import SearchContainer from "./SearchContainer";
import SelectComponent from "@/components/common/SelectComponent";
import { LocationIcon, ManIcon } from "@/components/common/CustomIcon";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

const Navbar2 = () => {
  const options = [
    {
      label: "All Categories",
      value: "all_categories",
    },
    {
      label: "Men's Wear",
      value: "mens_wear",
    },
    {
      label: "Women's Wear",
      value: "womens_wear",
    },
    {
      label: "Kids",
      value: "kids",
    },
  ];
  return (
    <div className=" flex w-full items-center gap-10 section-padding-x">
      <div className=" flex gap-[70px] items-center w-full md:w-[80%]">
        <div className=" w-[166px] h-[85px]">
          <img src={Logo} className=" w-full h-full object-contain" />
        </div>
        <div className="w-full">
          <SearchContainer />
        </div>
      </div>

      <div className=" flex items-center gap-[57px]">
        <SelectComponent options={options} icon={<LocationIcon />} />
      </div>
      <div className="flex justify-between items-center gap-8">
        <p className="text-customSecondary cursor-pointer">Sell</p>
        <div className="relative flex items-center gap-3">
          <FaRegHeart className="text-[1.5rem] cursor-pointer" />
          <div className=" absolute top-[-50%] left-[17%] text-white min-w-[20px] min-h-[20px] text-center">
            <span className="text-[0.8rem] bg-[#FB0000] dark:border-[#020617] py-0.5 px-1 rounded-full w-full h-full">
              6
            </span>
          </div>
          <p className="text-customSecondary cursor-pointer">Wishlist</p>
        </div>
        <div className="relative flex items-center gap-3">
          <IoCartOutline className="text-[1.5rem] cursor-pointer" />
          <div className=" absolute top-[-50%] left-[17%] text-white min-w-[20px] min-h-[20px] text-center">
            <span className="text-[0.8rem] bg-[#FB0000] dark:border-[#020617] py-0.5 px-1 rounded-full w-full h-full">
              8
            </span>
          </div>
          <p className="text-customSecondary cursor-pointer">Cart</p>
        </div>
        <div className="relative flex items-center gap-0.5  ">
          <ManIcon className="text-[1.5rem] cursor-pointer" />
          <p className="text-customSecondary cursor-pointer">Account</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;

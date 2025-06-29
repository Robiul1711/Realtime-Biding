import React from "react";
import Logo from "@/assets/images/logo.png";
import SearchContainer from "./SearchContainer";
import SelectComponent from "@/components/common/SelectComponent";
import { LocationIcon, ManIcon } from "@/components/common/CustomIcon";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const options = [
    { label: "All Categories", value: "all_categories" },
    { label: "Men's Wear", value: "mens_wear" },
    { label: "Women's Wear", value: "womens_wear" },
    { label: "Kids", value: "kids" },
  ];

  return (
    <div className="flex flex-col xmd:flex-row w-full items-start xmd:items-center gap-6 xmd:gap-10 section-padding-x">
      <div className="flex gap-6 items-center">
        <div className="flex flex-col sm:flex-row gap-4 xl:gap-[70px] items-start sm:items-center w-full xl:w-[80%]">
          <div className="w-[100px] sm:w-[120px] lg:w-[166px] h-[65px] sm:h-[85px] mx-auto sm:mx-0">
            <img src={Logo} className="w-full h-full object-contain" />
          </div>
          <div className="w-full sm:w-auto">
            <SearchContainer />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-4 xmd:gap-[57px] w-full xmd:w-auto">
          <SelectComponent options={options} icon={<LocationIcon />} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8 w-full xmd:w-auto">
        <p className="text-customSecondary cursor-pointer">Sell</p>

        <div className="relative flex items-center gap-3">
          <FaRegHeart className="text-[1.5rem] cursor-pointer" />
          <div className="absolute top-[-50%] left-[17%] text-white min-w-[20px] min-h-[20px] text-center">
            <span className="text-[0.8rem] bg-[#FB0000] py-0.5 px-1 rounded-full w-full h-full">
              6
            </span>
          </div>
          <p className="text-customSecondary cursor-pointer">Wishlist</p>
        </div>

        <div className="relative flex items-center gap-3">
          <IoCartOutline className="text-[1.5rem] cursor-pointer" />
          <div className="absolute top-[-50%] left-[17%] text-white min-w-[20px] min-h-[20px] text-center">
            <span className="text-[0.8rem] bg-[#FB0000] py-0.5 px-1 rounded-full w-full h-full">
              8
            </span>
          </div>
          <p className="text-customSecondary cursor-pointer">Cart</p>
        </div>

        <Link to={"/join"}>
          <div className="relative flex items-center gap-0.5 cursor-pointer">
            <ManIcon className="text-[1.5rem]" />
            <p className="text-customSecondary">Account</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar2;

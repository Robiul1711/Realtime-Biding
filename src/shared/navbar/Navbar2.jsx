import React from "react";
import Logo from "@/assets/images/logo.png";
import SearchContainer from "./SearchContainer";
import SelectComponent from "@/components/common/SelectComponent";
import { LocationIcon, ManIcon } from "@/components/common/CustomIcon";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import UserActions from "@/components/common/UserAction";

const Navbar2 = () => {
  const options = [
    { label: "All Categories", value: "all_categories" },
    { label: "Men's Wear", value: "mens_wear" },
    { label: "Women's Wear", value: "womens_wear" },
    { label: "Kids", value: "kids" },
  ];

  return (
    <div className="flex flex-col xmd:flex-row w-full items-start xmd:items-center section-padding-x mt-20 2xl:gap-12">
      <div className="flex flex-col xxs:flex-row gap-2 sm:gap-6 md:items-center">
        <div className="flex flex-col sm:flex-row gap-5 xl:gap-[70px] items-start sm:items-center w-full xl:w-[80%]">
          <div className="w-[60px] md:w-[80px] lg:w-[126px] xl:w-[166px] h-[65px] sm:h-[85px] mx-auto sm:mx-0 hidden md:block">
            <Link to={"/"}>
              <img src={Logo} className="w-full h-full object-contain " />
            </Link>
          </div>
          <div className="w-full sm:w-auto">
            <SearchContainer />
          </div>
        </div>

        <div className="">
          <SelectComponent options={options} icon={<LocationIcon />} />
        </div>
      </div>
      <div className="hidden lg:block xlg:ml-5">
        <UserActions />
      </div>
    </div>
  );
};

export default Navbar2;

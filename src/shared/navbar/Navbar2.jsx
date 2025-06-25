import React from "react";
import Logo from "@/assets/images/logo.png";
import SearchContainer from "./SearchContainer";
import SelectComponent from "@/components/common/SelectComponent";
import { LocationIcon } from "@/components/common/CustomIcon";

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
    <div className=" flex w-full items-center gap-12 section-padding-x">
      <div className=" flex gap-[70px] items-center ">
        <div className=" w-[166px] h-[85px]">
          <img src={Logo} className=" w-full h-full object-contain" />
        </div>
        <div className=" w-full">
          <SearchContainer />
        </div>
      </div>

      <div className=" flex items-center gap-[57px]">
        <SelectComponent options={options} icon={<LocationIcon />} />
      </div>
    </div>
  );
};

export default Navbar2;

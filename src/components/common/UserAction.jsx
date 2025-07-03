import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ManIcon } from "./CustomIcon";
import { MdOutlineSell } from "react-icons/md";

const UserActions = () => {
  return (
    <div className="flex flex-row justify-between items-start sm:items-center gap-4 xl:gap-8 w-full xmd:w-auto bg-white py-4 px-8 2xl:px-4">
      <div className="relative flex items-center gap-0.5 cursor-pointer">
        <MdOutlineSell className="text-[1.2rem] sm:text-[1.5rem]" />
        <p className="text-customSecondary text-[15px] xl:text-base">Sell</p>
      </div>

      <div className="relative flex items-center gap-3">
        <FaRegHeart className="text-[1.2rem] sm:text-[1.5rem] cursor-pointer" />
        <div className="absolute top-[-50%] left-[17%] text-white min-w-[20px] min-h-[20px] text-center">
          <span className="text-[0.6rem] xl:text-[0.8rem] bg-[#FB0000] py-0.5 px-1 rounded-full w-full h-full">
            6
          </span>
        </div>
        <p className="text-customSecondary cursor-pointer text-[15px] xl:text-base">
          Wishlist
        </p>
      </div>

      <div className="relative flex items-center gap-3">
        <IoCartOutline className="text-[1.2rem] sm:text-[1.5rem] cursor-pointer" />
        <div className="absolute top-[-50%] left-[17%] text-white min-w-[20px] min-h-[20px] text-center">
          <span className="text-[0.6rem] xl:text-[0.8rem] bg-[#FB0000] py-0.5 px-1 rounded-full w-full h-full">
            8
          </span>
        </div>
        <p className="text-customSecondary cursor-pointer text-[15px] xl:text-base">
          Cart
        </p>
      </div>

      <Link to="/join">
        <div className="relative flex items-center gap-0.5 cursor-pointer">
          <ManIcon className="text-[1.2rem] sm:text-[1.5rem]" />
          <p className="text-customSecondary text-[15px] xl:text-base">
            Account
          </p>
        </div>
      </Link>
    </div>
  );
};

export default UserActions;

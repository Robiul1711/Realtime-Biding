import React from "react";
import resetImage from "../../assets/images/reset.png";
import Title from "@/components/common/Title";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row w-full">
      {/* left */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 md:py-0">
        <div className="w-full max-w-md md:w-[65%]">
          <h2 className="text-xl md:text-[32px] font-semibold mb-6 md:mb-8 text-[#363636]">
            Reset password
          </h2>
          <label
            htmlFor="email"
            className="block mb-2 text-[#585858] font-medium text-sm md:text-[17px]"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            className="border px-4 py-2 md:py-3 rounded-md mb-6 text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to={"/verification"}>
            <button className="bg-[#001767] text-white py-2 md:py-3 rounded-lg w-full hover:bg-[#001787] transition-all duration-300 text-sm font-medium cursor-pointer">
              Reset Password
            </button>
          </Link>
        </div>
      </div>

      {/* right */}
      <div className="bg-[#001767] w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-10 md:py-0">
        <Title
          level="title48"
          className="mb-2 text-white ml-0 lg:ml-8  xl:ml-0"
        >
          Welcome Back! Bid & Win with <br className="hidden xl:block" />
          Your Community.
        </Title>
        <p className="my-6 text-[#CDCDCD] w-full max-w-xl">
          Glad to have you back! Browse new listings, connect with traders, and
          swap items easily. Log in to continue your trading journey!
        </p>
        <div className="mt-4 w-full max-w-[620px]">
          <img
            src={resetImage}
            alt="Reset Visual"
            className="w-full h-auto object-contain rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

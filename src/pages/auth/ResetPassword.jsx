import React from "react";
import resetImage from "../../assets/images/reset.png";
import Title from "@/components/common/Title";

const ResetPassword = () => {
  return (
    <div className="h-screen flex w-full">
      {/* left */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="w-full md:w-[65%]">
          <h2 className="text-lg md:text-[32px] font-semibold mb-8 text-[#363636]">
            Reset password
          </h2>
          <label className="mb-3 text-[#001767]" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email your address"
            className="border px-4 py-2 md:py-3 rounded-md mb-6 mt-1 text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-[#0D1C51] text-white py-2 md:py-3 rounded-lg w-full hover:bg-[#1f2e6e] transition-all duration-300 text-sm font-medium cursor-pointer">
            Reset Password
          </button>
        </div>
      </div>
      {/* right */}
      <div className="bg-[#001767] w-full md:w-1/2 flex flex-col items-center justify-center">
        <Title level="title48" className="mb-2 text-white">
          Welcome Back! Bid & Win with <br /> Your Community.
        </Title>
        <p className="my-6 text-[#CDCDCD] w-full md:w-[66%] mx-auto">
          Glad to have you back! Browse new listings, connect with traders, and
          swap items easily. Log in to continue your trading journey!
        </p>
        <div className="mt-4">
          <img
            src={resetImage}
            alt="Reset Visual"
            className="rounded-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

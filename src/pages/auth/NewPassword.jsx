import React from "react";
import resetImage from "../../assets/images/reset.png";
import Title from "@/components/common/Title";
import { Link } from "react-router-dom";

const NewPassword = () => {
  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row w-full">
      {/* left */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md lg:w-[65%]">
          <h2 className="text-xl md:text-[32px] font-semibold mb-6 md:mb-8 text-[#363636]">
            Create new password
          </h2>
          <p className="text-[#5A5C5F] text-sm md:text-[17px] mb-6">
            Enter your new password below to complete the reset process
          </p>

          <label
            className="mb-2 block text-[#585858] font-medium text-sm md:text-[17px]"
            htmlFor="new-password"
          >
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            placeholder="Enter your password"
            className="border px-4 py-2 md:py-3 rounded-md mb-6 text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label
            className="mb-2 block text-[#585858] font-medium text-sm md:text-[17px]"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Enter your password"
            className="border px-4 py-2 md:py-3 rounded-md mb-2 text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-[#4B5563] text-sm md:text-[16px] my-6">
            We've sent a 6 digit verification code to your email. Check your
            spam folder in case you didn't receive the code.
          </p>

          <Link to={"/reset-successfull"} className="block">
            <button className="bg-[#001767] text-white py-2 md:py-3 rounded-3xl w-full xl:w-[30%] hover:bg-[#001787] transition-all duration-300 text-sm font-medium cursor-pointer">
              Continue
            </button>
          </Link>
        </div>
      </div>

      {/* right */}
      <div className="bg-[#001767] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-10">
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

export default NewPassword;

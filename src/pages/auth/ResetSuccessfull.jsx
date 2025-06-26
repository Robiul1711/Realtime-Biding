import React from "react";
import resetImage from "../../assets/images/reset.png";
import Title from "@/components/common/Title";
import { Link } from "react-router-dom";

const ResetSuccessfull = () => {
  return (
    <div className="h-screen flex w-full">
      {/* left */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="w-full md:w-[65%]">
          <h2 className="text-lg md:text-[32px] font-semibold mb-8 text-[#363636]">
            Password set successfully
          </h2>
          <p className="text-[#5A5C5F] text-sm md:text-[17px] mb-6">
            You can now use your new password to log in to your account
          </p>

          <Link to={"/sign-in"} className="flex items-start">
            <button className="bg-[#001767] text-white py-2 md:py-3 rounded-3xl w-[26%] hover:bg-[#001787] transition-all duration-300 text-sm font-medium cursor-pointer">
              Sign In
            </button>
          </Link>
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

export default ResetSuccessfull;

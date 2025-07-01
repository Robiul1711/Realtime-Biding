import React from "react";
import resetImage from "../../assets/images/reset.png";
import Title from "@/components/common/Title";
import OtpInput from "@/components/common/OTPInput";
import { Link } from "react-router-dom";

const Verification = () => {
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row w-full">
      {/* left */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 md:py-0">
        <div className="w-full max-w-md md:w-[65%]">
          <h2 className="text-xl md:text-[32px] font-semibold mb-6 md:mb-8 text-[#363636]">
            Enter the verification code
          </h2>
          <p className="text-[#4B5563] text-sm md:text-[17px] mb-6">
            We sent code to{" "}
            <span className="text-[#001767] font-semibold">
              ha**********@gmail.com
            </span>
          </p>
          <OtpInput />

          <Link to={"/new-password"} className="block mt-6">
            <button className="bg-[#001767] text-white py-2 md:py-3 rounded-3xl w-full xl:w-[30%] hover:bg-[#001787] transition-all duration-300 text-sm font-medium cursor-pointer">
              Continue
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

export default Verification;

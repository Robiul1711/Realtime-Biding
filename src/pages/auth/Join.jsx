import Title from "@/components/common/Title";
import React from "react";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen overflow-y-hidden">
      <Title level="title48" className="mb-2 text-center">
        Welcome Back! Bid & Win with <br /> Your Community.
      </Title>
      <p className="text-[#757575] w-full md:w-[40%] mx-auto px-4 md:px-0 my-4 text-center">
        Glad to have you back! Browse new listings, connect with traders, and
        swap items easily. Log in to continue your trading journey!
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
        <Link to={"/sign-in"}>
          {" "}
          <div className="border p-8 rounded-md flex flex-col justify-center items-center w-full md:max-w-[300px] text-center cursor-pointer hover:border hover:border-[#0046F9] hover:bg-[#e0e6f6]">
            <Title level="title24">Join As Buyer</Title>
            <p className="text-customSecondary mt-2 text-sm md:text-base">
              Find shifts, track hours, and get paid on time.
            </p>
          </div>
        </Link>

        <Link to={"/sign-in"}>
          <div className="border p-8 rounded-md flex flex-col justify-center items-center w-full md:max-w-[300px] text-center cursor-pointer hover:border hover:border-[#0046F9] hover:bg-[#e0e6f6]">
            <Title level="title24">Join As Seller</Title>
            <p className="text-customSecondary mt-2 text-sm md:text-base">
              Find shifts, track hours, and get paid on time.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Join;

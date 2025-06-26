import React from "react";
import { useForm } from "react-hook-form";
import image from "../../assets/images/logo.png";
import image1 from "../../assets/images/signup.png";
import { Link, ScrollRestoration } from "react-router-dom";

const ProfileSetup2 = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen flex items-center justify-center section-padding-x">
      <ScrollRestoration />
      <div className="w-full flex justify-between ">
        {/* Left Content */}
        <div className="p-8 md:p-16 flex flex-col justify-center w-full md:w-[60%]">
          <h2 className="text-2xl md:text-5xl font-bold text-[#363636] leading-20 mb-2">
            Welcome Back! Bid & Win with <br /> Your Community.
          </h2>
          <p className="text-[#4B5563] text-sm md:text-[17px] mb-12">
            Glad to have you back! Browse new listings, connect with traders,
            and swap items easily. Log in to continue your trading journey!
          </p>

          <img
            src={image1}
            alt="Sign In Illustration"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="p-12 bg-[#001767] rounded-lg text-white mt-24 h-full w-full md:flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="bg-white rounded-3xl px-16 py-12">
              <div className="flex justify-center mb-4">
                <img className="h-16" src={image} alt="logo" />
              </div>
              <div className="flex items-center gap-4 my-4">
                <hr className="flex-grow border-t border-[#949ca4]" />
                <p className="text-[#607080] text-sm">Card Information</p>
                <hr className="flex-grow border-t border-[#7d8389]" />
              </div>

              <div className="my-2">
                <label className="block mb-1 font-semibold   text-[#132235] text-[17px]">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  placeholder="Ex: Saklain Sarowor"
                  {...register("card-number", { required: true })}
                  className="w-full px-4  py-2 md:py-3 my-1 text-gray-800 border border-[#607080] rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-1 font-medium text-[#132235]">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="Enter apartment..."
                  {...register("number", { required: true })}
                  className="w-full px-4  py-2 md:py-3 my-1 text-gray-800 border border-[#607080] rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex w-full gap-4 mt-4">
                <div className="w-1/2">
                  <label className="block mb-1 font-medium text-[#132235]">
                    CVV
                  </label>
                  <input
                    type="text"
                    {...register("cvv", { required: true })}
                    placeholder="Enter your State "
                    className="w-full px-4  py-2 md:py-3 my-1 text-gray-800 border border-[#607080] rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 font-medium text-[#132235]">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    {...register("date", { required: true })}
                    placeholder="03/29"
                    className="w-full px-4  py-2 md:py-3 my-1 text-gray-800 border border-[#607080] rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 text-gray-400 my-4">
              <input
                type="checkbox"
                {...register("agree")}
                className="w-4 h-4 text-[#ebedf4]"
              />
              I agree to the Terms & Conditions
            </label>

            {/* Submit Button */}
            <Link to="/">
              <button
                type="submit"
                className="w-full py-2 md:py-3 px-4 text-white bg-[#0046F9] rounded-2xl  mt-4 cursor-pointer"
              >
                Continue
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup2;

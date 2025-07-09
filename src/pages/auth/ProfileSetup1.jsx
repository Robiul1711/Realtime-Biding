import React from "react";
import { useForm } from "react-hook-form";
import image from "../../assets/images/signup.png";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ProfileSetup1 = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
  } = useForm();


  const ProfileMutation = useMutation({
  mutationFn: async (data) => {
    const response = await axiosSecure.post("/profile/complete", data);
    return response?.data;
  },
    onSuccess: (response) => {
      toast.success(response?.message || "Profile setup successful");
      navigate("/profile-setup-2");
    },
    onError: (error) => {
      console.log('error',error)
      const errorMessage =
      error.response?.data?.message?.phone || "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });

const onSubmit = (data) => {
  ProfileMutation.mutate(data);
};

  return (
    <div className="min-h-screen flex items-center justify-center section-padding-x">
      <ScrollRestoration />
      <div className="w-full flex flex-col lg:flex-row justify-between ">
        {/* Left Content */}
        <div className="p-2 xl:p-16 flex flex-col justify-center w-full lg:w-[60%]">
          <h2 className="text-2xl md:text-5xl font-bold text-[#363636] md:leading-20 mb-2">
            Welcome Back! Bid & Win with <br className="hidden xl:block" /> Your
            Community.
          </h2>
          <p className="text-[#4B5563] text-sm md:text-[17px] mb-6 xl:mb-12">
            Glad to have you back! Browse new listings, connect with traders,
            and swap items easily. Log in to continue your trading journey!
          </p>

          <img
            src={image}
            alt="Sign In Illustration"
            className="w-full h-[320px] lg:h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="p-6 lg:p-12 bg-[#001767] rounded-lg text-white mt-2 xl:mt-24 h-full w-full md:flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 my-4 md:my-6"
          >
            <h3 className="text-lg md:text-3xl font-semibold mb-6">
              Complete your account info
            </h3>

            <div>
              <label className="block mb-2  font-medium text-[#A1A1A1]">
                County or region
              </label>
              <input
                type="text"
                {...register("country", { required: true })}
                placeholder="Select country"
                className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
              />
            </div>
            <div>
              <label className="block mb-2  font-medium text-gray-400">
                Street Address
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                placeholder="Enter your street address"
                className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-400">
                City
              </label>
              <input
                type="text"
                {...register("city", { required: true })}
                placeholder="Your City"
                className="w-full px-4 py-2  md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
              />
            </div>
            <div className="flex flex-col xl:flex-row w-full gap-4">
              <div className="w-full xl:w-1/2">
                <label className="block mb-2 font-medium text-gray-400">
                  State or Province or Region
                </label>
                <input
                  type="text"
                  {...register("lat")}
                  placeholder="Enter your State "
                  className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="block mb-2 font-medium text-gray-400">
                  ZIP Code
                </label>
                <input
                  type="text"
                  {...register("lng")}
                  placeholder="Enter your ZIP Code"
                  className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-400">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                placeholder="Enter your street address"
                className="w-full px-4 py-2  md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
              />
            </div>

            <label className="flex items-center gap-2 text-gray-400 my-4">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                className="w-4 h-4 text-[#ebedf4]"
              />
              I agree to the Terms & Conditions
            </label>
              <button
                type="submit"
                className="w-full py-2 md:py-3 px-4 text-white bg-[#0046F9] rounded-3xl md:mt-4 cursor-pointer"
              >
                Continue
              </button>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup1;

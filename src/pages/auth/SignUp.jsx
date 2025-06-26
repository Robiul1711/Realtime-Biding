import React from "react";
import { useForm } from "react-hook-form";
import image from "../../assets/images/signup.png";
import { Link, ScrollRestoration } from "react-router-dom";

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen flex items-center justify-center section-padding-x">
      <ScrollRestoration />
      <div className="w-full flex justify-between gap-8">
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
            src={image}
            alt="Sign In Illustration"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-16 bg-[#001767] rounded-lg text-white mt-24 h-full w-full md:flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-8">
            <h3 className="text-lg md:text-3xl font-semibold mb-6">
              Signup now
            </h3>

            <div>
              <label className="block mb-2  font-medium text-gray-400">
                Full Name
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your name"
                className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block mb-2  font-medium text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-2 font-medium text-gray-400">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="••••••••"
                className="w-full px-4 py-2  md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-400">
                Confirm Password
              </label>
              <input
                type="confirm password"
                {...register("password", { required: true })}
                placeholder="••••••••"
                className="w-full px-4 py-2  md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
              />
            </div>

            {/* Checkbox + Forgot Password */}
            <label className="flex items-center gap-2 text-gray-400 my-4">
              <input
                type="checkbox"
                {...register("agree")}
                className="w-4 h-4 text-[#ebedf4]"
              />
              I agree to the Terms & Conditions
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 md:py-3 px-4 text-[#021352] bg-white rounded-lg mt-4 cursor-pointer"
            >
              Sign Up
            </button>

            {/* Signup Text */}
            <p className="text-sm text-center text-gray-400 pt-2">
              Don’t have an account?{" "}
              <Link
                to="/sign-in"
                className="text-[#fcfdff] font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

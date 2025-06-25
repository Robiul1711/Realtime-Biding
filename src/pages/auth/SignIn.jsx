import React from "react";
import image from "../../assets/images/signin.png";
import { useForm } from "react-hook-form";
import { Link, ScrollRestoration } from "react-router-dom";

const SignIn = () => {
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
          <p className="text-[#4B5563] text-sm md:text-[17px] mb-6">
            Glad to have you back! Browse new listings, connect with traders,
            and swap items easily. Log in to continue your trading journey!
          </p>
          <div className="bg-[#F3F3F1] p-16 rounded-lg mt-6">
            <img
              src={image}
              alt="Sign In Illustration"
              className="rounded-md w-full max-w-sm mx-auto"
            />
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-16 bg-[#001767] rounded-lg text-white my-10 w-full md:flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-16">
            <h3 className="text-lg md:text-3xl font-semibold">Welcome Back</h3>

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

            {/* Checkbox + Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  {...register("agree")}
                  className="w-4 h-4 text-[#ebedf4]"
                />
                I agree to the Terms & Conditions
              </label>
              <Link
                to="/forgot-password"
                className="text-[#e1e3eb] font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 md:py-3 px-4 text-[#021352] bg-white rounded-lg mt-4 cursor-pointer"
            >
              Sign In
            </button>

            {/* Signup Text */}
            <p className="text-sm text-center text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/sign-up"
                className="text-[#fcfdff] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;

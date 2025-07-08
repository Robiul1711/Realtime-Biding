import React from "react";
import image from "../../assets/images/signin.png";
import { useForm } from "react-hook-form";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
const SignIn = () => {
 const {  setUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const LogInMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/login", data);
      return response?.data;
    },
   onSuccess: (response) => {
  toast.success(response?.message || "Login successful");

  const accessToken = response?.data?.token?.original?.access_token;
  const user = response?.data?.user;

  const userData = {
    token: accessToken,
    ...user,
  };

  setUser(userData);

  localStorage.setItem("user", JSON.stringify(userData));

  navigate("/profile-setup-1");
},

    onError: (error) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    LogInMutation.mutate(data);
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding-x">
      <ScrollRestoration />
      <div className="w-full flex flex-col lg:flex-row justify-between gap-6">
        {/* Left Content */}
        <div className="pt-4 lg:p-16 flex flex-col justify-center w-full lg:w-[60%]">
          <h2 className="text-2xl md:text-5xl font-bold text-[#363636] md:leading-16 lg:leading-20 mb-2">
            Welcome Back! Bid & Win with <br className="hidden xl:block" /> Your
            Community.
          </h2>
          <p className="text-[#4B5563] text-sm md:text-[17px] mb-6">
            Glad to have you back! Browse new listings, connect with traders,
            and swap items easily. Log in to continue your trading journey!
          </p>
          <div className="bg-[#F3F3F1] p-4 lg:p-12 rounded-lg mt-2 lg:mt-6">
            <img
              src={image}
              alt="Sign In Illustration"
              className="rounded-md w-full max-w-md mx-auto"
            />
          </div>
        </div>

        {/* Right Form */}
        <div className="p-6 lg:p-10 xl:p-16 bg-[#001767] rounded-lg text-white my-2 lg:my-10 w-full md:flex-1">
        <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-6 mt-4 md:mt-16"
>
  <h3 className="text-lg md:text-3xl font-semibold">Welcome Back</h3>

  {/* Email Input */}
  <div>
    <label className="block mb-2 font-medium text-gray-400">
      Email Address
    </label>
    <input
      type="email"
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Invalid email address",
        },
      })}
      placeholder="Enter your email address"
      className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
    />
    {errors.email && (
      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
    )}
  </div>

  {/* Password Input */}
  <div>
    <label className="block mb-2 font-medium text-gray-400">Password</label>
    <input
      type="password"
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      })}
      placeholder="••••••••"
      className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001767]"
    />
    {errors.password && (
      <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
    )}
  </div>

  {/* Terms + Forgot Password */}
  <div className="flex flex-col xl:flex-row justify-between xl:items-center text-sm space-y-2">
    <label className="flex items-center gap-2 text-gray-400">
      <input
        type="checkbox"
        {...register("agree")}
        className="w-4 h-4 text-[#ebedf4]"
      />
      I agree to the Terms & Conditions
    </label>
    <Link
      to="/reset-password"
      className="text-[#e1e3eb] font-medium hover:underline"
    >
      Forgot Password?
    </Link>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full py-2 md:py-3 px-4 text-[#021352] bg-white rounded-lg xl:mt-4 cursor-pointer"
  >
     {LogInMutation?.isPending ? (
            <BeatLoader
              loading={LogInMutation?.isPending}
              color="#021352"
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "  Login"
          )}
  </button>

  {/* Signup Text */}
  <p className="text-sm text-center text-gray-400">
    Don’t have an account?{" "}
    <Link
      to="/join"
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

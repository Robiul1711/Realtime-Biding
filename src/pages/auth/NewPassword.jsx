import React, { useState } from "react";
import resetImage from "../../assets/images/reset.png";
import Title from "@/components/common/Title";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { BeatLoader } from "react-spinners";
const NewPassword = () => {
  const { email, resetToken } = useEmail();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  console.log(email, resetToken);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const ResetPassMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/reset-password", data);
      return response?.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message || "Password reset successful");
      navigate("/sign-in");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Something went wrong, try again later!";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      email,
      expire_token: resetToken,
      password: data?.password,
      password_confirmation: data?.password_confirmation,
    };
    ResetPassMutation.mutate(payload);
  };

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

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* New Password */}
            <label className="mb-2 block text-[#585858] font-medium text-sm md:text-[17px]">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "New password is required",
                  
                })}
                className="border px-4 py-2 md:py-3 rounded-md text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 mb-4">
                {errors.password.message}
              </p>
            )}

            {/* Confirm Password */}
            <label className="mb-2 block text-[#585858] font-medium text-sm md:text-[17px]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                {...register("password_confirmation", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="border px-4 py-2 md:py-3 rounded-md text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 mb-4">
                {errors.confirmPassword.message}
              </p>
            )}

            <p className="text-[#4B5563] text-sm md:text-[16px] my-6">
              We've sent a 4 digit verification code to your email. Check your
              spam folder in case you didn't receive the code.
            </p>

            <button
              type="submit"
              className="bg-[#001767] text-white py-2 md:py-3 rounded-3xl w-full  hover:bg-[#001787] transition-all duration-300 text-sm font-medium cursor-pointer"
            >
              {ResetPassMutation?.isPending ? (
            <BeatLoader
              loading={ResetPassMutation?.isPending}
              color="white"
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Reset Password"
          )}
            </button>
          </form>
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

import React from "react";
import resetImage from "../../assets/images/reset.png";
import Title from "@/components/common/Title";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEmail } from "@/hooks/useEmail";
import { useAuth } from "@/hooks/useAuth";
import { BeatLoader } from "react-spinners";
import logo from "../../assets/images/logo.png";
const ResetPassword = () => {
  const { setEmail } = useEmail();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
    const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ForgetMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/forget-password", data);
      return response?.data;
    },
    onSuccess: (response, variables) => {
      toast.success(response?.message);
       setUser({ email: variables.email });
      navigate("/verification");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Something went wrong, try again later!";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    setEmail(data.email);
    ForgetMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex  lg:flex-row w-full">
      {/* Left */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 lg:py-0">
        <div className="w-full max-w-lg lg:w-[65%]">
                    <Link to="/">
            <img
              src={logo}
              alt=""
              className="w-[120px] mx-auto  mb-10"
            />
          </Link>
          <h2 className="text-xl lg:text-[32px] font-semibold mb-6 lg:mb-8 text-[#363636]">
            Reset password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="email"
              className="block mb-2 text-[#585858] font-medium text-sm lg:text-[17px]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email address"
              className="border px-4 py-2 lg:py-3 rounded-lg text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}

            <button
              type="submit"
              className="bg-[#001767] text-white py-2 lg:py-3 mt-6 rounded-lg w-full hover:bg-[#001787] transition-all duration-300 text-sm font-medium cursor-pointer"
            >
           {ForgetMutation?.isPending ? (
            <BeatLoader
              loading={ForgetMutation?.isPending}
              color="white"
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "  Reset Password"
          )}
            </button>
          </form>
        </div>
      </div>

      {/* Right */}
      <div className="hidden  bg-[#001767] w-full lg:w-1/2 lg:flex flex-col items-center justify-center px-6 py-10 lg:py-0">
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
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import image from "../../assets/images/signup.png";
import {
  Link,
  ScrollRestoration,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "@/hooks/useAuth";
import { BeatLoader } from "react-spinners";
const SignUp = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch("password");

  const signUpMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/register", {
        ...data,
        type,
      });
      return response?.data;
    },
    onSuccess: (response, variables) => {
      toast.success(response?.message || "Signup successful");
      setUser({ email: variables.email });
      navigate("/verification");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    if (data.password !== data.password_confirmation) {
      toast.error("Passwords do not match!");
      return;
    }
    signUpMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding-x">
      <ScrollRestoration />
      <div className="w-full flex flex-col lg:flex-row justify-between gap-2">
        {/* Left Content */}
        <div className="p-4 lg:p-16 flex flex-col justify-center w-full lg:w-[60%]">
          <h2 className="text-2xl md:text-5xl font-bold text-[#363636] md:leading-12 lg:leading-16 mb-2">
            Welcome Back! Bid & Win with <br className="hidden xl:block" /> Your
            Community.
          </h2>
          <p className="text-[#4B5563] text-sm md:text-[17px] mb-6 lg:mb-12">
            Glad to have you back! Browse new listings, connect with traders,
            and swap items easily. Log in to continue your trading journey!
          </p>

          <img
            src={image}
            alt="Sign Up Illustration"
            className="w-full h-[300px] lg:h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-12 xl:p-16 bg-[#001767] rounded-lg text-white mt-2 xl:mt-24 h-full w-full md:flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 my-4 md:my-8"
          >
            <h3 className="text-lg md:text-3xl font-semibold mb-6">
              Signup now as {type?.toUpperCase()}
            </h3>

            {/* Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-400">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
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
                    message: "Invalid email format",
                  },
                })}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none"
                />
                <span
                  className="absolute right-3 top-3 text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-400">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("password_confirmation", {
                    required: "Confirm password is required",
                  })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 md:py-3 text-gray-400 bg-white rounded-lg focus:outline-none"
                />
                <span
                  className="absolute right-3 top-3 text-gray-600 cursor-pointer"
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.password_confirmation && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-center gap-2 text-gray-400 my-4">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms",
                })}
              />
              I agree to the Terms & Conditions
            </label>
            {errors.terms && (
              <p className="text-red-400 text-sm -mt-2">
                {errors.terms.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 md:py-3 px-4 text-[#021352] bg-white rounded-lg lg:mt-4 cursor-pointer"
            >
              {signUpMutation?.isPending ? (
                <BeatLoader
                  loading={signUpMutation?.isPending}
                  color="#021352"
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "    Sign Up"
              )}
            </button>

            {/* Redirect Link */}
            <p className="text-sm text-center text-gray-400 pt-2">
              Already have an account?{" "}
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

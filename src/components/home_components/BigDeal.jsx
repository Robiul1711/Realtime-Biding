import React from "react";
import { useForm } from "react-hook-form";
import bigdeal from "../../assets/images/bigdeal.png";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";

const BigDeal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const axiosPublic = useAxiosPublic();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post(`/newsletter/subscribe`, data);
      return res.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message || "Subscribed successfully!");
      reset();
    },
    onError: (error) => {
      if (error.response?.data?.errors?.email) {
        // Set error for react-hook-form
        setError("email", {
          type: "manual",
          message: error.response.data.errors.email[0],
        });
      } else {
        toast.error(
          error.response?.data?.message || 
          "Failed to subscribe. Please try again later."
        );
      }
    }
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="section-padding-x py-6 md:py-10">
      <div className="flex flex-col-reverse md:flex-row justify-between bg-[#E9E9E9] py-10 px-5 sm:px-10 rounded-2xl">
        <div className="flex-1">
          <h2 className="sm:text-xl md:text-3xl lg:text-[40px] text-[#253D4E] max-w-[750px] font-bold mb-4">
            Stay In, Bid Big – Win Amazing Deals from the Comfort of Your Home
          </h2>
          <p className="md:text-lg text-[#7E7E7E] mb-6">
            Secure the Best Deals, Every Time!
          </p>
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="relative w-full max-w-md"
          >
            <div className="relative">
              <input
                type="email"
                disabled={isPending}
                className={`outline-none bg-white rounded-full w-full py-2 lg:py-4 pr-36 pl-4 ${
                  errors.email ? "border border-red-500" : "border border-transparent"
                } ${isPending ? "opacity-80" : ""}`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              <button
                type="submit"
                disabled={isPending}
                className={`absolute top-1/2 right-0 -translate-y-1/2 bg-[#FB0000] text-white px-4 sm:px-6 py-2 lg:py-4 rounded-full hover:bg-red-700 transition flex items-center gap-2 ${
                  isPending ? "pr-6" : ""
                }`}
              >
                {isPending ? (
                  <>
                    <FiLoader className="animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 pl-4">
                {errors.email.message}
              </p>
            )}
          </form>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={bigdeal}
            alt="Big Deal"
            className="w-full max-w-md mx-auto pb-5 md:pb-0 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BigDeal;
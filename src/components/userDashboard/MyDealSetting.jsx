import React, { useState } from "react";
import Title from "../common/Title";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const MyDealSetting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const { user } = useAuth();

  // Mutation for creating Stripe account
  const { 
    mutate: createStripeAccount, 
    isPending: isConnecting, 
    isError 
  } = useMutation({
    mutationFn: () => axiosSecure.get("/stripe/connect"),
    onSuccess: (response) => {
      if (response.data?.data?.onboarding_url) {
        window.location.href = response.data?.data?.onboarding_url;
      }
    },
    onError: (error) => {
      console.error("Error creating Stripe account:", error);
      // Handle error (show toast, etc.)
    },
  });

  const onSubmit = (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      address: data.address,
      photo: photoFile,
    };
    console.log("Form Data:", formData);
  };

  const handleConnectAccount = () => {
    createStripeAccount();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

  return (
    <div>
      <Title level="title24" className="font-semibold text-black">
        Personal info
      </Title>
      <Title level="title16" className="text-black">
        Update your photo and personal details here.
      </Title>
      <span className="py-5"></span>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        {/* Name and Email Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              defaultValue={user?.name}
              {...register("name", { required: "Name is required" })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
                errors.name
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-100"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              defaultValue={user?.email}
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              disabled
              className={`w-full border rounded-md px-3 py-2 focus:outline-none bg-gray-100 ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-100"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Address Field */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
              errors.address
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-100"
            }`}
            placeholder="Enter your full address"
          />
          {errors.address && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Connect Account Button */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Connection
          </label>
          <button
            type="button"
            onClick={handleConnectAccount}
            disabled={isConnecting}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 ${
              isConnecting
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition-colors`}
          >
            {isConnecting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </>
            ) : (
              "Connect Your Account"
            )}
          </button>
          {isError && (
            <p className="text-xs text-red-500 mt-1">
              Error connecting account. Please try again.
            </p>
          )}
        </div>

        {/* Photo Upload */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your photo
          </label>
          <p className="text-xs text-gray-500 mb-2">
            This will be displayed on your profile.
          </p>
          <div className="flex items-center gap-4">
            <img
              src={photo || "https://i.pravatar.cc/64"}
              alt="Avatar"
              className="w-14 h-14 rounded-full object-cover"
            />
            <label className="w-full border border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition">
              <div className="text-blue-600 text-sm font-medium">
                Click to upload
              </div>
              <p className="text-xs text-gray-500">
                or drag and drop <br />
                SVG, PNG, JPG or GIF (max. 800×400px)
              </p>
              <input
                type="file"
                onChange={handlePhotoUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyDealSetting;
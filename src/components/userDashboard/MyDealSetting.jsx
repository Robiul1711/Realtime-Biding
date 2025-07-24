import React, { useState, useEffect } from "react";
import Title from "../common/Title";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MyDealSetting = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user, setUser } = useAuth();

  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const watchedValues = watch();

  // Detect if user changed any form value or image
  useEffect(() => {
    if (
      watchedValues.name !== user?.name ||
      watchedValues.address !== user?.address ||
      photoFile
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [watchedValues, photoFile, user]);

  // Create Stripe Account
  const {
    mutate: createStripeAccount,
    isPending: isConnecting,
    isError,
  } = useMutation({
    mutationFn: () => axiosSecure.get("/stripe/connect"),
    onSuccess: (response) => {
      const url = response?.data?.data?.onboarding_url;
      if (url) window.open(url, "_blank");
    },
    onError: (error) => {
      console.error("Stripe Connect Error:", error);
    },
  });

  // Save update mutation
  const updateMutation = useMutation({
  mutationFn: async (body) => {
    const res = await axiosSecure.post(`/update/user`, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  onSuccess: (response) => {
    setUser({ ...user, ...response?.data?.user });
    setHasChanges(false);
    toast.success("Profile updated successfully!");
  },
  onError: (error) => {
    const errorData = error?.response?.data?.message;

    if (errorData && typeof errorData === "object") {
      Object.entries(errorData).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => toast.error(msg));
        }
      });
    } else {
      toast.error("An error occurred while updating.");
    }
  },
});


  const onSubmit = (data) => {
    if (!hasChanges) return;

    const formData = new FormData();

    if (data.name !== user?.name) formData.append("name", data.name);
    if (data.address !== user?.address) formData.append("address", data.address);
    if (photoFile) formData.append("avatar", photoFile);

    updateMutation.mutate(formData);
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
      <Title level="title24" className="font-semibold text-black">Personal info</Title>
      <Title level="title16" className="text-black">
        Update your photo and personal details here.
      </Title>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        {/* Name and Email Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              defaultValue={user?.name}
              {...register("name")}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              defaultValue={user?.email}
              type="email"
              disabled
              className="w-full border rounded-md px-3 py-2 bg-gray-100 border-gray-300"
            />
          </div>
        </div>

        {/* Address Field */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            defaultValue={user?.address}
            {...register("address")}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full address"
          />
        </div>

        {/* Connect Stripe Account */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Connection</label>
          <button
            type="button"
            onClick={handleConnectAccount}
            disabled={isConnecting}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
              isConnecting
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isConnecting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Connecting...
              </>
            ) : (
              "Connect Your Account"
            )}
          </button>
          {isError && <p className="text-xs text-red-500 mt-1">Error connecting account.</p>}
        </div>

        {/* Photo Upload */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Your photo</label>
          <p className="text-xs text-gray-500 mb-2">This will be displayed on your profile.</p>
          <div className="flex items-center gap-4">
            <img
              src={photo || `${import.meta.env.VITE_IMG_URL}${user?.avatar}`}
              alt="Avatar"
              className="w-14 h-14 rounded-full object-cover"
            />
            <label className="w-full border border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition">
              <div className="text-blue-600 text-sm font-medium">Click to upload</div>
              <p className="text-xs text-gray-500">
                or drag and drop <br />
                SVG, PNG, JPG or GIF
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
        <div className="flex justify-end items-center gap-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!hasChanges || updateMutation.isPending}
            className={`px-5 py-2 text-sm font-medium text-white rounded-md flex items-center gap-2 ${
              updateMutation.isPending
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {updateMutation.isPending && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {updateMutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyDealSetting;

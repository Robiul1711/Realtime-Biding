import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Title from "../common/Title";

const PasswordSetting = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (data) => {
    console.log("Password updated:", data);
    // Call API or update logic here
    reset();
  };

  return (
    <>
        <Title level="title24" className="font-semibold text-black">Password</Title>
          <Title level="title16" className=" text-black mb-5">Please enter your current password to change your password.</Title>
         
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl bg-white space-y-5"
    >
      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current password
        </label>
        <div className="relative">
          <input
            type={showPassword.current ? "text" : "password"}
            placeholder="Current password *"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            className={`w-full border px-3 py-2 pr-10 rounded-md focus:outline-none ${
              errors.currentPassword
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-100"
            }`}
          />
          <button
            type="button"
            onClick={() => toggleVisibility("current")}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.currentPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New password
        </label>
        <div className="relative">
          <input
            type={showPassword.new ? "text" : "password"}
            placeholder="New password *"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full border px-3 py-2 pr-10 rounded-md focus:outline-none ${
              errors.newPassword
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-100"
            }`}
          />
          <button
            type="button"
            onClick={() => toggleVisibility("new")}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      {/* Confirm New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm new password
        </label>
        <div className="relative">
          <input
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Confirm new password *"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            className={`w-full border px-3 py-2 pr-10 rounded-md focus:outline-none ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-100"
            }`}
          />
          <button
            type="button"
            onClick={() => toggleVisibility("confirm")}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Update Password
        </button>
      </div>
    </form>
    </>
  );
};

export default PasswordSetting;

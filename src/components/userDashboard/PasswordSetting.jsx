import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Title from "../common/Title";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PasswordSetting = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const axiosSecure = useAxiosSecure();

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post(`/password/change`, data);
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res?.message || "Password updated successfully");
      reset();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to update password. Please try again.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <Title level="title24" className="font-semibold text-gray-900">
          Password Settings
        </Title>
        <Title level="title16" className="text-gray-600">
          Please enter your current password to change your password.
        </Title>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div>
          <label htmlFor="old_password" className="block text-sm font-medium text-gray-700 mb-1">
            Current password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="old_password"
              type={showPassword.current ? "text" : "password"}
              placeholder="Enter current password"
              {...register("old_password", {
                required: "Current password is required",
              })}
              className={`w-full border px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 ${
                errors.old_password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              aria-invalid={errors.old_password ? "true" : "false"}
              aria-describedby="old_password-error"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("current")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showPassword.current ? "Hide password" : "Show password"}
            >
              {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.old_password && (
            <p id="old_password-error" className="mt-1 text-sm text-red-600">
              {errors.old_password.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
            New password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="new_password"
              type={showPassword.new ? "text" : "password"}
              placeholder="Enter new password"
              {...register("new_password", {
                required: "New password is required",

              })}
              className={`w-full border px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 ${
                errors.new_password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              aria-invalid={errors.new_password ? "true" : "false"}
              aria-describedby="new_password-error"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showPassword.new ? "Hide password" : "Show password"}
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.new_password && (
            <p id="new_password-error" className="mt-1 text-sm text-red-600">
              {errors.new_password.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label htmlFor="new_password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm new password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="new_password_confirmation"
              type={showPassword.confirm ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("new_password_confirmation", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("new_password") || "Passwords do not match",
              })}
              className={`w-full border px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 ${
                errors.new_password_confirmation
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              aria-invalid={errors.new_password_confirmation ? "true" : "false"}
              aria-describedby="confirm_password-error"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showPassword.confirm ? "Hide password" : "Show password"}
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.new_password_confirmation && (
            <p id="confirm_password-error" className="mt-1 text-sm text-red-600">
              {errors.new_password_confirmation.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            disabled={isPending || !isDirty}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending || !isDirty}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSetting;
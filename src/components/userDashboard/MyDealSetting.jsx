import React, { useState } from 'react'
import Title from '../common/Title'
import { useForm } from 'react-hook-form';

const MyDealSetting = () => {
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [photo, setPhoto] = useState(null);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    console.log("Photo:", photo);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Title level="title24" className="font-semibold text-black">Personal info</Title>
      <Title level="title16" className=" text-black">Update your photo and personal details here.</Title>
<span className=' py-5'></span>
        <form
      onSubmit={handleSubmit(onSubmit)}
      className="  mt-5"
    >
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
              errors.firstName
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-100"
            }`}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
              errors.lastName
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-100"
            }`}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email",
            },
          })}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
            errors.email
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-100"
          }`}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
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
            <div className="text-blue-600 text-sm font-medium">Click to upload</div>
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

      {/* Country */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <select
          {...register("country", { required: "Please select a country" })}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
            errors.country
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-100"
          }`}
        >
          <option value="">Select country</option>
          <option value="United States">United States</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
        </select>
        {errors.country && (
          <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-4">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Save
        </button>
      </div>
    </form>
    </div>
  )
}

export default MyDealSetting

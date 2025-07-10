import React, { useState } from "react";
import { Upload, ChevronDown } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PricingAndAuction = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      subCategory: "",
      buyNow: "yes",
      buyNowPrice: "",
      startPrice: "",
      auctionEndAt: null,
      shipWithin: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Form Data:", data);
  };

  const buyNowEnabled = watch("buyNow") === "yes";

  return (
    <div>
      <form className="text-black space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Optional Buy Now */}
        <div className="flex items-center gap-6 mb-6">
          <label className="font-medium">Optional Buy Now</label>
          <label className="flex items-center gap-2">
            <input type="radio" value="yes" {...register("buyNow")} defaultChecked />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="no" {...register("buyNow")} />
            <span>No</span>
          </label>
        </div>

        {/* Buy Now Price */}
        {buyNowEnabled && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Optional Buy Now Price<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("buyNowPrice", { required: true })}
              placeholder="Enter product pricing"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.buyNowPrice && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
        )}

        {/* Start Price */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Start Price<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("startPrice", { required: true })}
            placeholder="Enter product pricing"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.startPrice && <span className="text-red-500 text-sm">This field is required</span>}
        </div>

        {/* Auction End At & Ship Within */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="w-full">
            <label className="block mb-1 font-medium">
              Auction End At<span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="auctionEndAt"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Enter auction date"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              )}
            />
            {errors.auctionEndAt && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Ship Within<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("shipWithin", { required: true })}
              placeholder="Enter shipping days"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.shipWithin && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
        </div>

        {/* Category and Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register("category", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white"
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="collectibles">Collectibles</option>
                <option value="fashion">Fashion</option>
                <option value="home-garden">Home & Garden</option>
                <option value="sports">Sports</option>
                <option value="toys">Toys</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.category && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register("subCategory", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white"
              >
                <option value="">Select subcategory</option>
                <option value="accessories">Accessories</option>
                <option value="gadgets">Gadgets</option>
                <option value="decor">Decor</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.subCategory && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address<span className="text-red-500">*</span>
            </label>
         
             <input
              type="text"
              {...register("shipWithin", { required: true })}
              placeholder="Enter shipping days"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.shipWithin && <span className="text-red-500 text-sm">This field is required</span>}
        
          </div>
        </div>
      </form>
    </div>
  );
};

export default PricingAndAuction;

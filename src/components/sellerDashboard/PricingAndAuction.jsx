import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";

const PricingAndAuction = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const buyNowEnabled = watch("buy_now") === "yes";

  return (
    <div className="text-black space-y-6">
      {/* Buy Now Option */}
      <div className="flex items-center gap-6">
        <label className="font-medium">Optional Buy Now</label>
        <label className="flex items-center gap-2">
          <input type="radio" value="yes" {...register("buy_now")} defaultChecked />
          <span>Yes</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="no" {...register("buy_now")} />
          <span>No</span>
        </label>
      </div>

      {/* Buy Now Price */}
      {buyNowEnabled && (
        <div>
          <label className="block mb-1 font-medium">
            Buy Now Price<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("buy_now_price", { required: true })}
            placeholder="Enter buy now price"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.buy_now_price && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
      )}

      {/* Starting Price */}
      <div>
        <label className="block mb-1 font-medium">
          Starting Price<span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register("starting_price", { required: true })}
          placeholder="Enter starting price"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.starting_price && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
      </div>

      {/* Auction End At & Ship Within */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">
            Auction End At<span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="auction_end_at"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) =>
                  field.onChange(dayjs(date).format("YYYY-MM-DD"))
                }
                dateFormat="yyyy-MM-dd"
                placeholderText="Select auction end date"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            )}
          />
          {errors.auction_end_at && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Ship Within (in days)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("ship_within", { required: true })}
            placeholder="e.g. 3"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.ship_within && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block mb-1 font-medium">
          City<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("city", { required: true })}
          placeholder="Enter city"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.city && <span className="text-red-500 text-sm">This field is required</span>}
      </div>

      {/* Country */}
      <div>
        <label className="block mb-1 font-medium">
          Country<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("country", { required: true })}
          placeholder="Enter country"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.country && <span className="text-red-500 text-sm">This field is required</span>}
      </div>

      {/* Address */}
      <div>
        <label className="block mb-1 font-medium">
          Address<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("address", { required: true })}
          placeholder="Enter address"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
    </div>
  );
};

export default PricingAndAuction;

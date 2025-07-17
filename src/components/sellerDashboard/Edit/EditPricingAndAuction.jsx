import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const EditPricingAndAuction = ({ isEditMode }) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const buyNowValue = watch("buy_now");
  const buyNowEnabled = buyNowValue === "yes";

  useEffect(() => {
    setValue("type", buyNowEnabled ? "sale" : "auction", {
      shouldValidate: true,
    });
  }, [buyNowEnabled, setValue]);

  return (
    <div className="text-black space-y-6">
      {/* Buy Now Option - Disabled in edit mode */}
      {!isEditMode && (
        <div className="flex items-center gap-6">
          <label className="font-medium">Optional Buy Now</label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="yes"
              {...register("buy_now", {
                onChange: () => {
                  setValue("type", "sale");
                  setValue("starting_price", "");
                  setValue("auction_end_at", "");
                },
              })}
              disabled={isEditMode}
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="no"
              {...register("buy_now", {
                onChange: () => {
                  setValue("type", "auction");
                  setValue("price", "");
                },
              })}
              disabled={isEditMode}
              defaultChecked
            />
            <span>No</span>
          </label>
        </div>
      )}

      {/* Buy Now Price */}
      {buyNowEnabled && (
        <div>
          <label className="block mb-1 font-medium">
            Buy Now Price<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: buyNowEnabled ? "Price is required" : false,
              min: { value: 0.01, message: "Price must be greater than 0" },
            })}
            placeholder="Enter buy now price"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={isEditMode}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>
      )}

      {/* Auction Fields */}
      {!buyNowEnabled && (
        <>
          <div>
            <label className="block mb-1 font-medium">
              Starting Price<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("starting_price", {
                required: !buyNowEnabled ? "Starting price is required" : false,
                min: { value: 0.01, message: "Price must be greater than 0" },
              })}
              placeholder="Enter starting price"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={isEditMode}
            />
            {errors.starting_price && (
              <span className="text-red-500 text-sm">
                {errors.starting_price.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Auction End Date<span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="auction_end_at"
              rules={{
                required: !buyNowEnabled ? "Auction end date is required" : false,
              }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => {
                    const formattedDate = dayjs(date).format("YYYY-MM-DD");
                    field.onChange(formattedDate);
                    setValue("auction_end_at", formattedDate, {
                      shouldValidate: true,
                    });
                  }}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select auction end date"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  disabled={isEditMode}
                  readOnly={isEditMode}
                />
              )}
            />
            {errors.auction_end_at && (
              <span className="text-red-500 text-sm">
                {errors.auction_end_at.message}
              </span>
            )}
          </div>
        </>
      )}

      {/* Ship Within - Always editable */}
      <div>
        <label className="block mb-1 font-medium w-full">
          Ship Within (days)<span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register("ship_within", {
            required: "Shipping days is required",
            min: { value: 1, message: "Must be at least 1 day" },
          })}
          placeholder="e.g. 3"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.ship_within && (
          <span className="text-red-500 text-sm">
            {errors.ship_within.message}
          </span>
        )}
      </div>

      {/* Location Fields - Always editable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-1 font-medium">
            Country<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("country", { required: "Country is required" })}
            placeholder="Enter country"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            City<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
            placeholder="Enter city"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Address<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            placeholder="Enter address"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPricingAndAuction;
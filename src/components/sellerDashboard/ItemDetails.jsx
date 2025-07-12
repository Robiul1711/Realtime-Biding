import React, { useEffect, useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ChevronDown } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const ItemDetails = () => {
  const [fileList, setFileList] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const additionalInputs =
    useWatch({ name: "additionalInputs", control }) || [];
  const buyNowValue = watch("buy_now");

  useEffect(() => {
    const defaultImages = control._defaultValues?.images || [];
    const formatted = defaultImages.map((url, i) => ({
      uid: i,
      name: `image-${i}`,
      status: "done",
      url,
    }));
    setFileList(formatted);
  }, [control]);

  const handleAddSection = () => {
    const newInputs = [...additionalInputs, { title: "", buyNowPrice: "" }];
    setValue("additionalInputs", newInputs);
  };

  const onSubmit = (data) => {
    console.log("Submitted Form Data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Hidden type input */}
        <input
          type="hidden"
          {...register("type")}
          value={buyNowValue === "yes" ? "sell" : "auction"}
        />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>    
<Controller
  control={control}
  name="images"
  rules={{ required: "At least one image is required" }}
  render={({ field: { onChange } }) => (
    <Upload
      multiple
      listType="picture"
      fileList={fileList}
      beforeUpload={() => false} // prevent auto upload
      onChange={({ fileList: newList }) => {
        setFileList(newList);

        // ✅ Handle both already-uploaded (with URL) and newly-selected files
        const actualFiles = newList.map((file) => {
          if (file.originFileObj) {
            return file.originFileObj; // new file
          } else if (file.url) {
            // reconstruct a File-like object with the original name if needed
            return file; // keep URL version if backend supports string URLs
          }
          return null;
        }).filter(Boolean);

        onChange(actualFiles); // only File objects or URL-backed ones
      }}
    >
      <Button icon={<UploadOutlined />}>Select Images</Button>
    </Upload>
  )}
/>


          {errors.images && (
            <span className="text-red-500 text-sm">
              {errors.images.message}
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter product title"
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <ReactQuill
                className="h-[200px] text-black"
                theme="snow"
                {...field}
              />
            )}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Care Guide */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Care Guide <span className="text-red-500">*</span>
          </label>
          <Controller
            name="care_guide"
            control={control}
            rules={{ required: "Care guide is required" }}
            render={({ field }) => (
              <ReactQuill
                className="h-[200px] text-black"
                theme="snow"
                {...field}
              />
            )}
          />
          {errors.care_guide && (
            <span className="text-red-500 text-sm">
              {errors.care_guide.message}
            </span>
          )}
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register("category_id", {
                  required: "Category is required",
                })}
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg bg-white appearance-none"
              >
                <option value="">Select a category</option>
                <option value="1">Electronics</option>
                <option value="2">Collectibles</option>
                <option value="3">Fashion</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.category_id && (
              <span className="text-red-500 text-sm">
                {errors.category_id.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                {...register("subcategory_id", {
                  required: "Subcategory is required",
                })}
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg bg-white appearance-none"
              >
                <option value="">Select sub category</option>
                <option value={1}>Accessories</option>
                <option value={2}>Gadgets</option>
                <option value={3}>Decor</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.subcategory_id && (
              <span className="text-red-500 text-sm">
                {errors.subcategory_id.message}
              </span>
            )}
          </div>
        </div>

        {/* Additional Inputs */}
        <div className="pt-2">
          <div className="flex justify-between items-center border-t border-gray-200 pt-6">
            <h3 className="text-base font-semibold text-gray-900">
              Additional Properties
            </h3>
            <button
              type="button"
              onClick={handleAddSection}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
            >
              <span>Add</span>
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
          </div>

          {additionalInputs.map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`product_properties.${index}.title`)}
                  placeholder="Enter the title"
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buy Now Price {index + 1}
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`product_properties.${index}.value`)}
                  placeholder="Enter the price"
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ItemDetails;

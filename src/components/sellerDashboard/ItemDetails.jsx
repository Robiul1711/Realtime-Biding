import React, { useEffect, useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ChevronDown } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const ItemDetails = () => {
  const [fileList, setFileList] = useState([]);
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const additionalInputs = useWatch({ name: "product_properties", control }) || [];
  const axiosPublic = useAxiosPublic();

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

  const { data: allCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res.data;
    },
  });

  const { data: allSubcategories } = useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/subcategories");
      return res.data;
    },
  });

  const handleAddProperty = () => {
    setValue("product_properties", [...additionalInputs, { title: "", value: "" }]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-8">
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
                beforeUpload={() => false}
                onChange={({ fileList: newList }) => {
                  setFileList(newList);
                  const actualFiles = newList
                    .map((file) => file.originFileObj || file)
                    .filter(Boolean);
                  onChange(actualFiles);
                }}
              >
                <Button icon={<UploadOutlined />}>Select Images</Button>
              </Upload>
            )}
          />
          {errors.images && (
            <span className="text-red-500 text-sm">{errors.images.message}</span>
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
        <div className=" mt-20">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
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
                {allCategories?.data?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
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
                {allSubcategories?.data?.map((subcategory) => (
                  <option  key={subcategory.id} value={subcategory.id}>
                    {subcategory.title}
                  </option>
                ))}
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

        {/* Additional Properties */}
        <div className="pt-2">
          <div className="flex justify-between items-center border-t border-gray-200 pt-6">
            <h3 className="text-base font-semibold text-gray-900">
              Additional Properties
            </h3>
            <button
              type="button"
              onClick={handleAddProperty}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
            >
              <span>Add Property</span>
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
          </div>

          {additionalInputs.map((_, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Name
                </label>
                <input
                  type="text"
                  {...register(`product_properties.${index}.title`)}
                  placeholder="e.g. Condition"
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Value
                </label>
                <input
                  type="text"
                  {...register(`product_properties.${index}.value`)}
                  placeholder="e.g. Excellent"
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
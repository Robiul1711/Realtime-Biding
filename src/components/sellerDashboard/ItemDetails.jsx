import React, { useState } from 'react'
import { Upload, ChevronDown } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useForm, Controller } from 'react-hook-form';
const ItemDetails = () => {
      const [isDragOver, setIsDragOver] = useState(false);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      title: '',
      category: '',
      subCategory: '',
      buyNowPrice: '',
      description: '',
      careGuide: '',
    },
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    console.log('Dropped files:', files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    console.log('Selected files:', files);
  };

  const onSubmit = (data) => {
    console.log('Submitted Form Data:', data);
  };
  return (
    <div>
      
      <form
        className=" space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >

        <div className="space-y-6">
          {/* Upload Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images<span className="text-red-500">*</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-lg py-4 text-center transition-colors ${
                isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm border border-gray-200">
                  <Upload className=" text-gray-500" />
                </div>
                <p className="text-base font-medium text-gray-900">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG (Max. 25MB)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Select Files
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description<span className="text-red-500">*</span></label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  className="text-gray-800 h-[200px] bg-white border border-gray-300 rounded-lg overflow-hidden"
                  theme="snow"
                  placeholder="Describe your item in detail..."
                  {...field}
                />
              )}
            />
          </div>

          {/* Care Guide */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Care Guide<span className="text-red-500">*</span></label>
            <Controller
              name="careGuide"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  className="text-gray-800 h-[200px] bg-white border border-gray-300 rounded-lg overflow-hidden"
                  theme="snow"
                  placeholder="Provide care instructions for your item..."
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* Category and Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category<span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                {...register('category', { required: true })}
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category<span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                {...register('subCategory', { required: true })}
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white"
              >
                <option value="">Select sub category</option>
                <option value="accessories">Accessories</option>
                <option value="gadgets">Gadgets</option>
                <option value="decor">Decor</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Additional Inputs */}
        <div className="pt-2">
          <div className="flex justify-between items-center border-t border-gray-200 pt-6">
            <h3 className="text-base font-semibold text-gray-900">Additional Properties</h3>
            <button
              type="button"
              onClick={() => setShowAdditionalInputs(!showAdditionalInputs)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
            >
              {showAdditionalInputs ? (
                <>
                  <span>Hide</span>
                  <ChevronDown className="ml-1 w-4 h-4 transform rotate-180" />
                </>
              ) : (
                <>
                  <span>Add</span>
                  <ChevronDown className="ml-1 w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {showAdditionalInputs && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  {...register('title', { required: true })}
                  placeholder="e.g. Vintage Camera"
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Buy Now Price</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    {...register('buyNowPrice')}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

       
      </form>
    </div>
  )
}

export default ItemDetails

import React, { useState } from 'react';
import { Upload, ChevronDown } from 'lucide-react';

const CreateListingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    buyNowPrice: '',
    auctionDuration: '',
    shipWithin: '',
    description: ''
  });

  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
    // Handle file drop logic here
    const files = e.dataTransfer.files;
    console.log('Dropped files:', files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    console.log('Selected files:', files);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Listing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our Standard Service Plan is designed for homeowners who want a reliable and cost-effective solution
            without compromising on quality.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Information Item</h2>
          
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white"
                >
                  <option value="">-- Select Category --</option>
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

            {/* Optional Buy Now Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Optional Buy Now Price<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="buyNowPrice"
                value={formData.buyNowPrice}
                onChange={handleInputChange}
                placeholder="Enter product pricing"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Auction Duration and Ship Within */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auction Duration<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="auctionDuration"
                  value={formData.auctionDuration}
                  onChange={handleInputChange}
                  placeholder="Enter auction days"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ship Within<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shipWithin"
                  value={formData.shipWithin}
                  onChange={handleInputChange}
                  placeholder="Enter shipping days"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
              />
            </div>

            {/* Upload Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images<span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragOver
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-1">
                    Click to Upload Front Side of Card
                  </p>
                  <p className="text-sm text-gray-500">
                    (Max. File size: 25 MB)
                  </p>
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
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                  >
                    Choose Files
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingForm;

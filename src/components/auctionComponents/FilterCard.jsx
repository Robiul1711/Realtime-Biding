import React, { useState, useEffect } from "react";
import Title from "../common/Title";
import { Minus, Plus } from "lucide-react";
import FilterSection from "./FilterSection";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const FilterCard = () => {
  const axiosPublic = useAxiosPublic();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [checkedOptions, setCheckedOptions] = useState({});
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: ""
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosPublic.get("/categories");
      return response.data;
    },
  });

  // Fetch filters
  const { data: filtersData } = useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const response = await axiosPublic.get("/products/filter/items");
      return response.data;
    },
  });

  // Initialize with first category if available
  useEffect(() => {
    if (categoriesData?.data?.length > 0 && !selectedCategory) {
      setSelectedCategory(categoriesData.data[0].id);
    }
  }, [categoriesData, selectedCategory]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleOptionChange = (filterName, value) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [filterName]: {
        ...prev[filterName],
        [value]: !prev[filterName]?.[value],
      },
    }));
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePricePresetSelect = (preset) => {
    switch(preset) {
      case 'under4000':
        setPriceRange({ min: "", max: "4000" });
        break;
      case '4000to20000':
        setPriceRange({ min: "4000", max: "20000" });
        break;
      case 'over20000':
        setPriceRange({ min: "20000", max: "" });
        break;
      default:
        setPriceRange({ min: "", max: "" });
    }
  };

  const resetFilters = () => {
    setCheckedOptions({});
    setSelectedSubcategory(null);
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Category Filter Section */}
        <div className="border border-gray-200 rounded-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <Title level="title24">Category</Title>
            {categoryOpen ? (
              <Minus size={20} className="text-gray-500" />
            ) : (
              <Plus size={20} className="text-gray-500" />
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              categoryOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 pt-0 space-y-3">
              {categoriesData?.data?.map((category) => (
                <div key={category.id} className="space-y-2">
                  <h4
                    onClick={() => handleCategorySelect(category.id)}
                    className={`font-medium cursor-pointer ${
                      selectedCategory === category.id
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {category.title}
                  </h4>

                  {category.subcategories?.length > 0 && (
                    <div className="ml-3 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <p
                          key={subcategory.id}
                          onClick={() =>
                            handleSubcategorySelect(subcategory.id)
                          }
                          className={`text-sm cursor-pointer ${
                            selectedSubcategory === subcategory.id
                              ? "text-blue-600 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {subcategory.title}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Filter Sections */}
        {filtersData?.data &&
          Object.entries(filtersData.data).map(([filterName, options]) => (
            <FilterSection
              key={filterName}
              title={filterName}
              options={options.map((option) => ({
                label: option,
                value: option,
              }))}
              checkedOptions={checkedOptions[filterName] || {}}
              onChange={(value) => handleOptionChange(filterName, value)}
            />
          ))}

        {/* Price Filter Section */}
        <div className="border border-gray-200 rounded-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setPriceOpen(!priceOpen)}
          >
            <Title level="title24">Price</Title>
            {priceOpen ? (
              <Minus size={20} className="text-gray-500" />
            ) : (
              <Plus size={20} className="text-gray-500" />
            )}
          </div>
          
          <div
            className={`overflow-hidden transition-all duration-300 ${
              priceOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 pt-0 space-y-3">
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={priceRange.max === "4000" && !priceRange.min}
                    onChange={() => handlePricePresetSelect('under4000')}
                  />
                  <span>Under $4,000</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={priceRange.min === "4000" && priceRange.max === "20000"}
                    onChange={() => handlePricePresetSelect('4000to20000')}
                  />
                  <span>$4,000 to $20,000</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={priceRange.min === "20000" && !priceRange.max}
                    onChange={() => handlePricePresetSelect('over20000')}
                  />
                  <span>Over $20,000</span>
                </label>
              </div>

              <div className="pt-2">
                <p className="text-sm text-gray-600 mb-2">Custom Range</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="min"
                    placeholder="$ Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={priceRange.min}
                    onChange={handlePriceRangeChange}
                  />
                  <span className="text-gray-500 text-sm">To</span>
                  <input
                    type="number"
                    name="max"
                    placeholder="$ Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={priceRange.max}
                    onChange={handlePriceRangeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Reset Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={resetFilters}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
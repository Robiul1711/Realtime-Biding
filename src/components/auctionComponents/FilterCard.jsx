import React, { useState, useEffect } from "react";
import Title from "../common/Title";
import { Minus, Plus } from "lucide-react";
import FilterSection from "./FilterSection";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const FilterCard = () => {
  const axiosPublic = useAxiosPublic();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [checkedOptions, setCheckedOptions] = useState({});

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

  const resetFilters = () => {
    setCheckedOptions({});
    setSelectedSubcategory(null);
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
            onClick={() => setIsOpen(!isOpen)}
          >
            <Title level="title24">Category</Title>
            {isOpen ? (
              <Minus size={20} className="text-gray-500" />
            ) : (
              <Plus size={20} className="text-gray-500" />
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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

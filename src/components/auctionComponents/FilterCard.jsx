// import React, { useState, useEffect } from "react";
// import Title from "../common/Title";
// import { Minus, Plus } from "lucide-react";
// import FilterSection from "./FilterSection";
// import useAxiosPublic from "@/hooks/useAxiosPublic";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useCart } from "@/hooks/useCart";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// const FilterCard = ({ filterProducts, setFilterProducts,page2,setPage2 }) => {
//   const axiosPublic = useAxiosPublic();
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [priceOpen, setPriceOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   const [checkedOptions, setCheckedOptions] = useState({});
//   const { filterValue, setFilterValue } = useCart();
//   const [priceRange, setPriceRange] = useState({
//     min: "",
//     max: "",
//   });

//   const axiosSecure = useAxiosSecure();

//   const filerMutation = useMutation({
//     mutationFn: async (allData) => {
//       const res = await axiosSecure.post(`/all/products/filter?page=${page2}`, allData);
//       setFilterProducts(res.data?.data?.data);
//     },
//   });

//   // Fetch categories
//   const { data: categoriesData } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response = await axiosPublic.get("/categories");
//       return response.data;
//     },
//   });

//   // Fetch filters
//   const { data: filtersData } = useQuery({
//     queryKey: ["filters"],
//     queryFn: async () => {
//       const response = await axiosPublic.get("/products/filter/items");
//       return response.data;
//     },
//   });

//   // Initialize with first category if available
//   useEffect(() => {
//     if (categoriesData?.data?.length > 0 && !selectedCategory) {
//       setSelectedCategory(categoriesData.data[0].id);
//     }
//   }, [categoriesData, selectedCategory]);

//   const handleCategorySelect = (categoryId) => {
//     setSelectedCategory(categoryId);
//     setSelectedSubcategories([]);
//   };

//   const handleSubcategorySelect = (subcategoryId) => {
//     setSelectedSubcategories((prev) => {
//       if (prev.includes(subcategoryId)) {
//         return prev.filter((id) => id !== subcategoryId);
//       } else {
//         return [...prev, subcategoryId];
//       }
//     });
//   };

//   const handleOptionChange = (filterName, value) => {
//     setCheckedOptions((prev) => ({
//       ...prev,
//       [filterName]: {
//         ...prev[filterName],
//         [value]: !prev[filterName]?.[value],
//       },
//     }));
//   };

//   const handlePriceRangeChange = (e) => {
//     const { name, value } = e.target;
//     setPriceRange((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePricePresetSelect = (preset) => {
//     switch (preset) {
//       case "under4000":
//         setPriceRange((prev) => ({
//           ...prev,
//           min: "0",
//           max: "3999",
//         }));
//         break;
//       case "4000to20000":
//         setPriceRange((prev) => ({
//           ...prev,
//           min: "4000",
//           max: "20000",
//         }));
//         break;
//       case "over20000":
//         setPriceRange((prev) => ({
//           ...prev,
//           min: "20000",
//           max: "100000",
//         }));
//         break;
//       default:
//         setPriceRange({ min: "", max: "" });
//     }
//   };

//   const resetFilters = () => {
//     setCheckedOptions({});
//     setSelectedSubcategories([]);
//     setPriceRange({ min: "", max: "" });
//   };

//   const applyFilters = () => {
//     // Collect all selected filter values
//     const selectedValues = [];
//     Object.entries(checkedOptions).forEach(([filterName, options]) => {
//       Object.entries(options).forEach(([value, isChecked]) => {
//         if (isChecked) {
//           selectedValues.push(value);
//         }
//       });
//     });

//     // Check if any filters are selected
//     const hasSubcategoryFilters = selectedSubcategories.length > 0;
//     const hasValueFilters = selectedValues.length > 0;
//     const hasPriceFilters = priceRange.min || priceRange.max;
//     const hasAnyFilters =
//       hasSubcategoryFilters || hasValueFilters || hasPriceFilters;

//     // Prepare the filter object
//     const newFilterValue = {
//       values: selectedValues,
//       subcat: selectedSubcategories,
//     };

//     // Add price range if set
//     if (hasPriceFilters) {
//       newFilterValue.min = priceRange.min
//         ? parseInt(priceRange.min)
//         : undefined;
//       newFilterValue.max = priceRange.max
//         ? parseInt(priceRange.max)
//         : undefined;
//     }

//     // Update filter state regardless (for UI consistency)
//     setFilterValue(newFilterValue);

//     if (!hasAnyFilters) {
//       toast.error("Please select at least one filter before applying");
//       return;
//     }

//     try {
//       // Only mutate if there are actual filters selected
//       filerMutation.mutate(newFilterValue, {
//         onSuccess: () => {
//           toast.success("Filters applied successfully");
//           console.log("Filters applied:", newFilterValue);
//         },
//         onError: (error) => {
//           toast.error("Failed to apply filters");
//           console.error("Filter error:", error);
//         },
//       });
//     } catch (error) {
//       toast.error("An unexpected error occurred");
//       console.error("Unexpected error:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[calc(100vh-150px)] bg-white rounded-lg shadow-sm border border-gray-200">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 flex items-center gap-2 justify-between">
//         <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
//         <button
//           onClick={applyFilters}
//           className=" py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium"
//         >
//           Apply
//         </button>
//       </div>

//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-5">
//         {/* Category Filter Section */}
//         <div className="border border-gray-200 rounded-lg">
//           <div
//             className="flex items-center justify-between p-4 cursor-pointer"
//             onClick={() => setCategoryOpen(!categoryOpen)}
//           >
//             <Title level="title24">Category</Title>
//             {categoryOpen ? (
//               <Minus size={20} className="text-gray-500" />
//             ) : (
//               <Plus size={20} className="text-gray-500" />
//             )}
//           </div>

//           <div
//             className={`overflow-hidden transition-all duration-300 ${
//               categoryOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//             }`}
//           >
//             <div className="p-4 pt-0 space-y-3">
//               {categoriesData?.data?.map((category) => (
//                 <div key={category.id} className="space-y-2">
//                   <h4
//                     onClick={() => handleCategorySelect(category.id)}
//                     className={`font-medium cursor-pointer ${
//                       selectedCategory === category.id
//                         ? "text-blue-600"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     {category.title}
//                   </h4>

//                   {category.subcategories?.length > 0 && (
//                     <div className="ml-3 space-y-1">
//                       {category.subcategories.map((subcategory) => (
//                         <div key={subcategory.id} className="flex items-center">
//                           <input
//                             type="checkbox"
//                             id={`subcat-${subcategory.id}`}
//                             checked={selectedSubcategories.includes(
//                               subcategory.id
//                             )}
//                             onChange={() =>
//                               handleSubcategorySelect(subcategory.id)
//                             }
//                             className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
//                           />
//                           <label
//                             htmlFor={`subcat-${subcategory.id}`}
//                             className={`text-sm cursor-pointer ${
//                               selectedSubcategories.includes(subcategory.id)
//                                 ? "text-blue-600 font-medium"
//                                 : "text-gray-600"
//                             }`}
//                           >
//                             {subcategory.title}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Dynamic Filter Sections */}
//         {filtersData?.data &&
//           Object.entries(filtersData.data).map(([filterName, options]) => (
//             <FilterSection
//               key={filterName}
//               title={filterName}
//               options={options.map((option) => ({
//                 label: option,
//                 value: option,
//               }))}
//               checkedOptions={checkedOptions[filterName] || {}}
//               onChange={(value) => handleOptionChange(filterName, value)}
//             />
//           ))}

//         {/* Price Filter Section */}
//         <div className="border border-gray-200 rounded-lg">
//           <div
//             className="flex items-center justify-between p-4 cursor-pointer"
//             onClick={() => setPriceOpen(!priceOpen)}
//           >
//             <Title level="title24">Price</Title>
//             {priceOpen ? (
//               <Minus size={20} className="text-gray-500" />
//             ) : (
//               <Plus size={20} className="text-gray-500" />
//             )}
//           </div>

//           <div
//             className={`overflow-hidden transition-all duration-300 ${
//               priceOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//             }`}
//           >
//             <div className="p-4 pt-0 space-y-3">
//               <div className="space-y-2">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox accent-blue-600"
//                     checked={
//                       priceRange.min === "0" && priceRange.max === "3999"
//                     }
//                     onChange={() => handlePricePresetSelect("under4000")}
//                   />
//                   <span>Under $4,000</span>
//                 </label>

//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox accent-blue-600"
//                     checked={
//                       priceRange.min === "4000" && priceRange.max === "20000"
//                     }
//                     onChange={() => handlePricePresetSelect("4000to20000")}
//                   />
//                   <span>$4,000 to $20,000</span>
//                 </label>

//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox accent-blue-600"
//                     checked={
//                       priceRange.min === "20000" && priceRange.max === "100000"
//                     }
//                     onChange={() => handlePricePresetSelect("over20000")}
//                   />
//                   <span>Over $20,000</span>
//                 </label>
//               </div>

//               <div className="pt-2">
//                 <p className="text-sm text-gray-600 mb-2">Custom Range</p>
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="number"
//                     name="min"
//                     placeholder="$ Min"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                     value={priceRange.min}
//                     onChange={handlePriceRangeChange}
//                   />
//                   <span className="text-gray-500 text-sm">To</span>
//                   <input
//                     type="number"
//                     name="max"
//                     placeholder="$ Max"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                     value={priceRange.max}
//                     onChange={handlePriceRangeChange}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer with Buttons */}
//       <div className="p-4 border-t border-gray-200 flex space-x-3">
//         <button
//           onClick={resetFilters}
//           className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors duration-200 font-medium"
//         >
//           Reset Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterCard;

import React, { useState, useEffect } from "react";
import Title from "../common/Title";
import { Minus, Plus, Loader2 } from "lucide-react";
import FilterSection from "./FilterSection";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCart } from "@/hooks/useCart";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const FilterCard = ({
  filterProducts,
  setFilterProducts,
  page2,
  setPage2,
  totalPage2,
  setTotalPage2,
}) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState({});
  const { filterValue, setFilterValue } = useCart();
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [hasFiltersApplied, setHasFiltersApplied] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

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

  // Filter mutation
  const filerMutation = useMutation({
    mutationFn: async (allData) => {
      const res = await axiosSecure.post(
        `/all/products/filter?page=${page2}`,
        allData
      );
      return res.data?.data;
    },
    onSuccess: (data) => {
      setFilterProducts(data?.data);
      if (data?.last_page) {
        setTotalPage2(data.last_page);
      }
      setHasFiltersApplied(true);
      setShowAllProducts(false); // Ensure "All Products" is unchecked when filters are applied
      toast.success("Filters applied successfully");
    },
    onError: (error) => {
      toast.error("Failed to apply filters");
      console.error("Filter error:", error);
    },
    onSettled: () => {
      setIsApplyingFilters(false);
    },
  });

  // Initialize with first category if available
  useEffect(() => {
    if (categoriesData?.data?.length > 0 && !selectedCategory) {
      setSelectedCategory(categoriesData.data[0].id);
    }
  }, [categoriesData, selectedCategory]);

  // Auto-refetch when page2 changes if filters are applied
  useEffect(() => {
    if (hasFiltersApplied && Object.keys(filterValue).length > 0 && !showAllProducts) {
      filerMutation.mutate(filterValue);
    }
  }, [page2]);

  // Handle "All Products" checkbox change
  const handleAllProductsChange = (e) => {
   
      resetFilters();
      setFilterProducts([]); // Empty array means show all products
      setHasFiltersApplied(false);
  
 
    
  };
  // const handleAllProductsChange = (e) => {
  //   const isChecked = e.target.checked;
  //   setShowAllProducts(isChecked);
    
  //   if (isChecked) {
  //     // Reset all filters and show all products
  //     resetFilters();
  //     setFilterProducts([]); // Empty array means show all products
  //     setHasFiltersApplied(false);
  //   } else {
  //     // When unchecking "All Products", reset to default state
  //     resetFilters();
  //   }
  // };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategories([]);
    setShowAllProducts(false); // Uncheck "All Products" when selecting a category
  };

  const handleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(subcategoryId)) {
        return prev.filter((id) => id !== subcategoryId);
      } else {
        return [...prev, subcategoryId];
      }
    });
    setShowAllProducts(false); // Uncheck "All Products" when selecting a subcategory
  };

  const handleOptionChange = (filterName, value) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [filterName]: {
        ...prev[filterName],
        [value]: !prev[filterName]?.[value],
      },
    }));
    setShowAllProducts(false); // Uncheck "All Products" when selecting a filter
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowAllProducts(false); // Uncheck "All Products" when setting price range
  };

  const handlePricePresetSelect = (preset) => {
    switch (preset) {
      case "under4000":
        setPriceRange({
          min: "0",
          max: "3999",
        });
        break;
      case "4000to20000":
        setPriceRange({
          min: "4000",
          max: "20000",
        });
        break;
      case "over20000":
        setPriceRange({
          min: "20000",
          max: "100000",
        });
        break;
      default:
        setPriceRange({ min: "", max: "" });
    }
    setShowAllProducts(false); // Uncheck "All Products" when selecting price preset
  };

  const resetFilters = () => {
    setCheckedOptions({});
    setSelectedSubcategories([]);
    setPriceRange({ min: "", max: "" });
    setFilterValue({});
    setPage2(1);
    setHasFiltersApplied(false);
    setShowAllProducts(false);
  };

  const applyFilters = () => {
    if (showAllProducts) {
      setFilterProducts([]); // Empty array means show all products
      return;
    }

    setIsApplyingFilters(true);

    // Collect all selected filter values
    const selectedValues = [];
    Object.entries(checkedOptions).forEach(([filterName, options]) => {
      Object.entries(options).forEach(([value, isChecked]) => {
        if (isChecked) {
          selectedValues.push(value);
        }
      });
    });

    // Check if any filters are selected
    const hasSubcategoryFilters = selectedSubcategories.length > 0;
    const hasValueFilters = selectedValues.length > 0;
    const hasPriceFilters = priceRange.min || priceRange.max;
    const hasAnyFilters =
      hasSubcategoryFilters || hasValueFilters || hasPriceFilters;

    // Prepare the filter object
    const newFilterValue = {
      values: selectedValues,
      subcat: selectedSubcategories,
    };

    // Add price range if set
    if (hasPriceFilters) {
      newFilterValue.min = priceRange.min
        ? parseInt(priceRange.min)
        : undefined;
      newFilterValue.max = priceRange.max
        ? parseInt(priceRange.max)
        : undefined;
    }

    // Update filter state
    setFilterValue(newFilterValue);
    setPage2(1); // Reset to first page when applying new filters

    if (!hasAnyFilters && !showAllProducts) {
      toast.error("Please select at least one filter before applying");
      setIsApplyingFilters(false);
      return;
    }

    filerMutation.mutate(newFilterValue);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-2 justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        <button
          onClick={applyFilters}
          disabled={isApplyingFilters}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium flex items-center gap-2"
        >
          {isApplyingFilters ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              Applying...
            </>
          ) : (
            "Apply"
          )}
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* All Products Checkbox */}
        <div onClick={handleAllProductsChange} className="border !cursor-pointer border-gray-200 rounded-lg p-4">
          <label className="flex items-center space-x-2 !cursor-pointer">
            {/* <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
              checked={showAllProducts}
              onChange={}
            /> */}
            <span className={`font-medium ${showAllProducts ? "text-blue-600" : ""}`}>
              Show All Products
            </span>
          </label>
        </div>

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
                    } ${showAllProducts ? "opacity-50" : ""}`}
                  >
                    {category.title}
                  </h4>

                  {category.subcategories?.length > 0 && (
                    <div className="ml-3 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`subcat-${subcategory.id}`}
                            checked={selectedSubcategories.includes(
                              subcategory.id
                            )}
                            onChange={() =>
                              handleSubcategorySelect(subcategory.id)
                            }
                            className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                            disabled={showAllProducts}
                          />
                          <label
                            htmlFor={`subcat-${subcategory.id}`}
                            className={`text-sm cursor-pointer ${
                              selectedSubcategories.includes(subcategory.id)
                                ? "text-blue-600 font-medium"
                                : "text-gray-600"
                            } ${showAllProducts ? "opacity-50" : ""}`}
                          >
                            {subcategory.title}
                          </label>
                        </div>
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
              disabled={showAllProducts}
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
                    checked={
                      priceRange.min === "0" && priceRange.max === "3999"
                    }
                    onChange={() => handlePricePresetSelect("under4000")}
                    disabled={showAllProducts}
                  />
                  <span className={showAllProducts ? "opacity-50" : ""}>Under $4,000</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={
                      priceRange.min === "4000" && priceRange.max === "20000"
                    }
                    onChange={() => handlePricePresetSelect("4000to20000")}
                    disabled={showAllProducts}
                  />
                  <span className={showAllProducts ? "opacity-50" : ""}>$4,000 to $20,000</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={
                      priceRange.min === "20000" && priceRange.max === "100000"
                    }
                    onChange={() => handlePricePresetSelect("over20000")}
                    disabled={showAllProducts}
                  />
                  <span className={showAllProducts ? "opacity-50" : ""}>Over $20,000</span>
                </label>
              </div>

              <div className="pt-2">
                <p className={`text-sm text-gray-600 mb-2 ${showAllProducts ? "opacity-50" : ""}`}>Custom Range</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="min"
                    placeholder="$ Min"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                      showAllProducts ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    value={priceRange.min}
                    onChange={handlePriceRangeChange}
                    disabled={showAllProducts}
                  />
                  <span className={`text-gray-500 text-sm ${showAllProducts ? "opacity-50" : ""}`}>To</span>
                  <input
                    type="number"
                    name="max"
                    placeholder="$ Max"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm ${
                      showAllProducts ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    value={priceRange.max}
                    onChange={handlePriceRangeChange}
                    disabled={showAllProducts}
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
          className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors duration-200 font-medium"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
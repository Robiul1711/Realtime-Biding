import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { search, setSearch, setSearchResults } = useEmail();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosPublic.get("/categories");
      return response.data;
    },
  });

  const { mutate: triggerSearch } = useMutation({
    mutationFn: async (payload) => {
      const response = await axiosPublic.post("/products/search", payload);
      return response.data; 
    },
    onSuccess: (response) => {
      setSearchResults(response?.data?.data); 
      setIsLoading(false);
      navigate("/search-result");
    },
    onError: (error) => {
      console.error("❌ Search Error:", error);
      console.error("Error details:", error.response?.data);
      setIsLoading(false);
    },
  });

  const handleCategoryClick = (catId) => {
    const catIdStr = String(catId);
    setIsLoading(true);
    setSearch((prev) => ({ ...prev, cat: catIdStr }));

    const searchPayload = {
      ...search,
      cat: catIdStr,
    };

    triggerSearch(searchPayload);
  };

  return (
    <div className="section-padding-x py-6 xl:py-10 text-[#7E7E7E] relative">
      {/* Full-screen loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50  backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-white text-center">
            <svg className="animate-spin h-12 w-12 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-xl font-semibold">Loading search results...</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto flex items-center justify-center pb-3">
        <ul className="flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap">
          {data?.data?.map((category, index) => (
            <button
              onClick={() => handleCategoryClick(category.id)}
              key={index}
              className="cursor-pointer hover:text-black font-semibold transition"
              disabled={isLoading}
            >
              {category.title}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
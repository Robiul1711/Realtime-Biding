import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEmail } from "@/hooks/useEmail";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { search, setSearch, setSearchResults } = useEmail();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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
    console.log("✅ Search Success:", response);
     setSearchResults(response?.data?.data); 
    navigate("/search-result");
  },
  onError: (error) => {
    console.error("❌ Search Error:", error);
    console.error("Error details:", error.response?.data);
  },
});

 const handleCategoryClick = (catId) => {
  const catIdStr = String(catId); // ✅ ensure it's a string
  console.log("Category ID:", catIdStr);

  setSearch((prev) => ({ ...prev, cat: catIdStr }));

  const searchPayload = {
    ...search,
    cat: catIdStr,
  };

  console.log("🔍 Sending Search Payload:", searchPayload);
  triggerSearch(searchPayload);
};


  return (
    <div className="section-padding-x py-6 xl:py-10 text-[#7E7E7E]">
      <div className="overflow-x-auto flex items-center justify-center pb-3">
        <ul className="flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap">
          {data?.data?.map((category, index) => (
            <button
              onClick={() => handleCategoryClick(category.id)}
              key={index}
              className="cursor-pointer hover:text-black font-semibold transition"
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

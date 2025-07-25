import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEmail } from "@/hooks/useEmail";

const TrendingOn = () => {
  const { search, setSearch, setSearchResults } = useEmail();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const { data } = useQuery({
    queryKey: ["categories", "trending"],
    queryFn: async () => {
      const response = await axiosPublic.get("/categories/trending");
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
      setIsLoading(false);
    },
  });

  const handleCategoryClick = (catId) => {
    const catIdStr = String(catId);
    const updatedSearch = { ...search, cat: catIdStr };
    setSearch(updatedSearch);
    setIsLoading(true);
    triggerSearch(updatedSearch);
  };

return (
  <div className="section-padding-x py-6 sm:py-10 relative">
    {/* Full-screen loading overlay */}
    {isLoading && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-white text-center">
          <svg
            className="animate-spin h-12 w-12 mx-auto text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
              5.291A7.962 7.962 0 014 12H0c0 
              3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-xl font-semibold">Loading...</p>
        </div>
      </div>
    )}

    {/* Swiper and other content */}
    <div className="flex justify-between items-center mb-5">
      <Title level="title40">Trending On</Title>
    </div>

    <Swiper
      spaceBetween={16}
      slidesPerView={6}
      loop
      grabCursor={true}
      breakpoints={{
        320: { slidesPerView: 2 },
        495: { slidesPerView: 3 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
        1280: { slidesPerView: 6 },
      }}
      className="w-full"
    >
      {data?.data?.map((item) => (
        <SwiperSlide key={item.id}>
          <button
            onClick={() => handleCategoryClick(item.id)}
            disabled={isLoading}
            className="w-full focus:outline-none"
          >
            <div className="flex justify-center border py-5 px-3 sm:py-10 rounded-2xl items-center flex-col gap-3 hover:shadow-lg transition">
              <img
                className="size-12 sm:size-16 md:size-20 rounded-full object-cover"
                src={item.image}
                alt={item.title}
              />
              <Title level="title18">{item.title}</Title>
            </div>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="flex flex-col md:flex-row justify-between md:items-center mt-5 sm:mt-10 bg-[#EAEAEA] p-6 sm:p-10 rounded-2xl">
      <div>
        <Title level="title48">Bid Smart, Win Big!</Title>
        <Title level="title16" className="text-gray-600 mt-2">
          Experience secure auctions, reliable deals, and hassle-free bidding.
        </Title>
      </div>
      <Link to="/auction-list" className="mt-6 md:mt-0">
        <button className="bg-[#FB0000] text-white px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-red-700 transition">
          Start now
        </button>
      </Link>
    </div>
  </div>
);

};

export default TrendingOn;

import React, { useRef, useState, useEffect } from "react";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const PopularMakes = () => {
  const axiosPublic = useAxiosPublic();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Fetch popular categories
  const { data: categoriesData } = useQuery({
    queryKey: ["popularCategories"],
    queryFn: async () => {
      const response = await axiosPublic.get("/categories/popular");
      return response.data;
    },
  });

  // Set first category as active when categories load
  useEffect(() => {
    if (categoriesData?.data?.length > 0 && !activeCategory) {
      setActiveCategory(categoriesData.data[0].title);
    }
  }, [categoriesData, activeCategory]);

  // Fetch products for selected category
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["categoryProducts", activeCategory],
    queryFn: async () => {
      if (!activeCategory) return { products: [] };
      
      const category = categoriesData?.data?.find(
        (cat) => cat.title === activeCategory
      );
      if (category) {
        const response = await axiosPublic.get(
          `/categories/${category.id}/products`
        );
        return response.data;
      }
      return { products: [] };
    },
    enabled: !!activeCategory && !!categoriesData,
  });

  const toggleBookmark = (productId) => {
    setBookmarked((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Update navigation when swiper instance or refs change
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, prevRef, nextRef]);

  // Create category list (no "All" option)
  const categoryList = categoriesData?.data?.map((cat) => cat.title) || [];

  // Get first 8 products
  const displayedProducts = productsData?.data?.products?.slice(0, 8) || [];

  return (
    <div className="section-padding-x pb-20 pt-10 lg:py-20 bg-[#001767] text-white">
      <div className="flex justify-between items-center mb-5">
        <Title level="title40">Popular Makes</Title>
      </div>

      {/* Categories tabs */}
      <div className="border-b border-gray-600 pb-4 mb-6 flex gap-8 overflow-x-auto">
        {categoryList.map((category) => (
          <p
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`cursor-pointer pb-1 border-b-2 transition duration-200 whitespace-nowrap ${
              activeCategory === category
                ? "border-[#3B9DF8] text-[#3B9DF8] font-semibold"
                : "border-transparent text-[#faf2f2]"
            }`}
          >
            {category}
          </p>
        ))}
      </div>

      {/* Products slider */}
      <div className="relative my-6">
        {isLoading ? (
          <div className="text-center py-10">Loading products...</div>
        ) : (
          <Swiper
            modules={[Navigation]}
            loop={displayedProducts.length > 4}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              375: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
            }}
            className="pb-10"
          >
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <Link to={`/search-product-details/${product.slug}`} className="bg-[#FFFFFF29]/50 rounded-lg shadow h-full flex flex-col">
                    <div className="relative flex-grow">
                      <img
                        src={`${import.meta.env.VITE_IMG_URL}${product.first_image || product.images?.[0]}`}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-xs text-red-700 font-bold">
                        {product.type === "auction" ? "Auction" : "For Sale"}
                      </p>
                      <div className="flex justify-between items-center gap-2 mt-3 mb-1">
                        <p className="text-lg font-bold">
                          {product.type === "auction"
                            ? `$${product.bid || 0}`
                            : `$${product.price || "N/A"}`}
                        </p>
                        {product.highest_bid && (
                          <p className="text-sm text-gray-300">
                            Highest: ${product.highest_bid}
                          </p>
                        )}
                      </div>
                      <p className="font-bold text-xs py-1.5">
                        <span className="text-red-700">
                          {product.type === "auction" ? "0 bids" : "Buy Now"}
                        </span>
                        {product.auction_end_at && (
                          <> · Ends {new Date(product.auction_end_at).toLocaleDateString()}</>
                        )}
                      </p>
                      <div className="flex flex-col gap-2 text-xs">
                        <p className="text-gray-300">
                          {product.city}, {product.country}
                        </p>
                        <p className="text-gray-300">
                          Posted: {new Date(product.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center py-10 col-span-full">
                No products found in this category
              </div>
            )}
          </Swiper>
        )}

        {/* Navigation buttons - only show if we have products */}
        {displayedProducts.length > 0 && (
          <div className="absolute -bottom-16 left-2 flex gap-3 z-10">
            <button
              ref={prevRef}
              className="bg-white p-2.5 rounded-full shadow hover:bg-gray-200 cursor-pointer"
            >
              <svg width="16" height="16" fill="currentColor">
                <path
                  d="M11 2L4 8l7 6"
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            <button
              ref={nextRef}
              className="bg-white p-2.5 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <svg width="16" height="16" fill="currentColor">
                <path
                  d="M5 2l7 6-7 6"
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularMakes;
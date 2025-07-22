import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { Cart, HeartShape } from "../common/CustomIcon";
import Title from "../common/Title";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return stars;
};

const SimilarProduct = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const { addToCart, cart, removeFromCart } = useCart();

  const axiosSecure = useAxiosSecure();

  const { data: SimilarProducts, isLoading } = useQuery({
    queryKey: ["similar-products", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/categories/${id}/products?type=sale`);
      return res.data;
    },
  });
  const BookmarkMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("/bookmark", data);
      return { ...response.data, productId: data.product_id };
    },
    onSuccess: (response) => {
      toast.success(response?.message || "Bookmark added successfully");
      setLikedItems((prev) => [...prev, response.productId]);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <div className="section-padding-x">
      <div className="bg-gray-50 py-8 lg:py-12 mb-6 px-4 lg:px-6 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold mb-6">
          You may also like
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-8"
        >
          {SimilarProducts?.data?.products?.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                to={`/search-product-details/${item?.slug}`}
                className="block border border-gray-200 rounded-xl bg-white hover:shadow-md transition-shadow duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      BookmarkMutation.mutate({ product_id: item.id });
                    }}
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    <HeartShape filled={false} className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative">
                  <img
                    src={`${import.meta.env.VITE_IMG_URL + item.images[0]}`}
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <button
                    className="absolute flex items-center justify-center gap-2 text-sm bottom-4 left-1/2 -translate-x-1/2 
                    bg-white text-gray-800  px-4  py-2
                    rounded-full opacity-0 group-hover:opacity-100 
                    transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      isInCart(item.id)
                        ? removeFromCart(item.id)
                        : addToCart(item);
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Cart className="w-4 h-4" />{" "}
                    {isInCart(item.id) ? "Remove from Cart" : "Add to Cart"}
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Title
                      level="title12"
                      className="font-medium text-gray-800 line-clamp-2"
                    >
                      {item.title}
                    </Title>
                    <Title
                      level="title14"
                      className="font-bold text-gray-900 whitespace-nowrap ml-2"
                    >
                      ${item.price}
                    </Title>
                  </div>

                  {/* {item.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {renderStars(item.rating)}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({item.reviewCount || 0} reviews)
                      </span>
                    </div>
                  )} */}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SimilarProduct;

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import today from "../../assets/images/cap.png";
import product2 from "../../assets/images/product2.png";
import { Cart, HeartShape } from "../common/CustomIcon";
import Title from "../common/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const data = [
  {
    id: 1,
    image: today,
    title: "Vintage Collection Item 1",
    price: "$24,500",
    review: "100 reviews",
    ratting: 2,
  },
  {
    id: 2,
    image: product2,
    title: "Vintage Collection Item 2",
    price: "$18,300",
    review: "100 reviews",
    ratting: 4,
  },
  {
    id: 3,
    image: product2,
    title: "Vintage Collection Item 3",
    price: "$32,100",
    review: "100 reviews",
    ratting: 5,
  },
  {
    id: 4,
    image: today,
    title: "Vintage Collection Item 4",
    price: "$25,000",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 5,
    image: product2,
    title: "Vintage Collection Item 5",
    price: "$21,700",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 6,
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 7,
    image: product2,
    title: "Vintage Collection Item 7",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 8,
    image: today,
    title: "Vintage Collection Item 8",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 9,
    image: product2,
    title: "Vintage Collection Item 9",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 10,
    image: today,
    title: "Vintage Collection Item 10",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
];
// const renderStars = (rating) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     if (rating >= i) {
//       stars.push(<FaStar key={i} className="text-black" />);
//     } else if (rating >= i - 0.5) {
//       stars.push(<FaStarHalfAlt key={i} className="text-black" />);
//     } else {
//       stars.push(<FaRegStar key={i} className="text-black" />);
//     }
//   }
//   return stars;
// };

const SimilarProduct = ({ id }) => {
  const axiosPublic = useAxiosPublic();

  const { data:SimilarProducts, isLoading } = useQuery({
    queryKey: ["similar-products"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/categories/${id}/products`);
      return res.data;
    },
  });


  return (
    <div className="section-padding-x">
      <div className="bg-[#F9F9F9] py-8 lg:py-12 mb-6 px-2 lg:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-[40px] text-[#253D4E] font-bold mb-4">
          You may also like
        </h2>

        <Swiper
          spaceBetween={16}
          loop
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="border border-[#E5E5E5] rounded-2xl bg-white hover:shadow cursor-pointer relative group">
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="transition-all"
                  >
                    <HeartShape filled={false} />
                  </button>
                </div>

                {/* Image wrapper is relative so we can position the button inside it */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[300px] md:h-auto object-cover"
                  />
                  <button
                    className="absolute flex items-center gap-2 text-sm bottom-3 left-1/2 -translate-x-1/2 
  bg-white text-black py-2 px-6 md:py-3 min-w-[160px] 
  rounded-full opacity-0 group-hover:opacity-100 
  transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Cart className="w-4 h-4" /> Add to Cart
                  </button>
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <Title level="title12">{item.title}</Title>
                    <Title
                      level="title14"
                      className="font-bold ml-2 text-[#B0B0B0]"
                    >
                      {item.price}
                    </Title>
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <div className="flex">{renderStars(item.ratting)}</div>
                    <Title level="title12" className="text-sm text-[#7E7E7E]">
                      {item.review}
                    </Title>
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SimilarProduct;

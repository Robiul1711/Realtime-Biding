import React, { useState } from "react";
import star from "../../assets/images/star.png";
import starw from "../../assets/images/starw.png";
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Accordion from "../common/Accordian";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";

const SearchProductText = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const { addToCart, cart, removeFromCart } = useCart();
  const BookmarkMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("/bookmark", data); // expects { product_id: ... }
      return { ...response.data, productId: data.product_id }; // attach productId so you can access it in onSuccess
    },
    onSuccess: (response) => {
      toast.success(response?.message || "Bookmark added successfully");
     
    },
    onError: (error) => {
      console.log(error)
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  console.log(product);

  return (
    <div>
      {/* <p className="text-[#000000] border py-1 mb-2 rounded-full uppercase w-[150px] text-center">
        baseball
      </p> */}
      <h3 className="text-[#000000] text-2xl md:text-4xl lg:text-[42px] xl:text-[60px] font-semibold my-2">
        {product?.title}
      </h3>
      <div className="flex items-center gap-4">
        <p className="text-lg md:text-2xl lg:text-[40px] text-[#C3C3C3] font-semibold">
          ${product?.price}
        </p>
        {/* <div className="flex items-center gap-2">
          <img src={star} alt=" star" />
          <img src={star} alt=" star" />
          <img src={star} alt=" star" />
          <img src={star} alt=" star" />
          <img src={starw} alt=" star" />
        </div>
        <p>100 reviews</p> */}
      </div>
      <div className="my-4 flex flex-col cl:flex-row items-center gap-6 w-full">
        <button
          onClick={() => {
            BookmarkMutation.mutate({ product_id: product?.id });
          }}
          className="px-6 py-2 md:py-3 w-full text-center hover:bg-[#0046F9] hover:text-[#F3F6FE] border text-[#000000] rounded-full flex items-center gap-2"
        >
          <IoIosHeartEmpty size={24} className="hover:fill-[#FFF] " /> Add to
          wishlist
        </button>
        <button
          onClick={() =>
            isInCart(product?.id)
              ? removeFromCart(product?.id)
              : addToCart(product)
          }
          className="px-6 py-2 md:py-3 w-full text-center hover:bg-[#0046F9] hover:text-[#F3F6FE] border text-[#000000] rounded-full flex items-center gap-2"
        >
          <HiOutlineShoppingBag size={24} className="hover:fill-[#FFF] " />
          {isInCart(product?.id) ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
      <Accordion product={product} />
    </div>
  );
};

export default SearchProductText;

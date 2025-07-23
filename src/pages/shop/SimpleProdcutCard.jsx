import React, { useState } from "react";
import { HeartShape } from "@/components/common/CustomIcon";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import ReactPaginate from "react-paginate";
import { Loader2 } from "lucide-react";

const SimpleProductCard = ({
  products,
  isLoading,
  page,
  setPage,
  totalPage,
  filterProducts,
  isFilterLoading,
  totalPage2,
  setTotalPage2,
  page2,
  setPage2,
}) => {
  const { addToCart, cart, removeFromCart } = useCart();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const queryClient = useQueryClient();

  const [bookmarkLoadingId, setBookmarkLoadingId] = useState(null);

  const BookmarkMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("/bookmark", data);
      return { ...response.data, productId: data.product_id };
    },
    onMutate: (data) => {
      setBookmarkLoadingId(data.product_id);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(response?.message || "Bookmark added successfully");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
    onSettled: () => {
      setBookmarkLoadingId(null);
    },
  });

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  // Determine which products to display
  const displayProducts =
    filterProducts && filterProducts.length > 0
      ? filterProducts
      : Array.isArray(products)
      ? products
      : [];

  const isLoadingState = isLoading || isFilterLoading;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xmd:grid-cols-2 lg:grid-cols-2 xlg:grid-cols-3 gap-4 mt-8">
        {isLoadingState ? (
          Array(6)
            .fill()
            .map((_, index) => (
              <div key={index} className="border border-[#CAC3C3] rounded-xl">
                <Skeleton height={240} className="w-full rounded-t-xl" />
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="my-1 w-full">
                      <Skeleton width="80%" height={16} className="mb-2" />
                      <div className="flex items-center gap-2">
                        <Skeleton width={60} height={14} />
                        <Skeleton width={40} height={14} />
                      </div>
                    </div>
                    <Skeleton circle width={24} height={24} />
                  </div>
                  <Skeleton width="70%" height={12} className="my-1" />
                  <Skeleton width="60%" height={12} className="my-1" />
                  <Skeleton width="50%" height={12} className="my-1" />
                  <Skeleton height={40} className="rounded-2xl mt-2" />
                </div>
              </div>
            ))
        ) : displayProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No Products found
          </p>
        ) : (
          displayProducts.map((item) => (
            <Link
              to={
                item?.type === `sale`
                  ? `/search-product-details/${item?.slug}`
                  : `/auction-details/${item?.slug}`
              }
              key={item.id}
              className="border border-[#CAC3C3] rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="h-[200px]">
                <img
                  className="w-full h-full object-cover rounded-t-xl"
                  src={VITE_IMG_URL + item?.images?.[0]}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = "/path/to/default-image.jpg";
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="my-1">
                    <p className="text-[14px] text-[#0C0D19] font-medium">
                      {item.title}
                    </p>
                    {item?.type === `sale` ? (
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] text-[#A8A8A8]">Price</p>
                        <p className="text-[15px] font-semibold text-[#0C0D19]">
                          ${item.price}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] text-[#A8A8A8]">
                          Highest Bid
                        </p>
                        <p className="text-[15px] font-semibold text-[#0C0D19]">
                          ${item?.highest_bid}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      BookmarkMutation.mutate({ product_id: item.id });
                    }}
                    className="transition-all"
                    title="Bookmark"
                    disabled={bookmarkLoadingId === item.id}
                  >
                    {bookmarkLoadingId === item.id ? (
                      <Loader2 className="animate-spin text-gray-600 w-5 h-5" />
                    ) : (
                      <HeartShape filled={item?.bookmark ? true : false} />
                    )}
                  </button>
                </div>

                <p className="text-[12px] text-[#161515] my-1">
                  From {item.country}
                </p>

                {item?.type === "sale" ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      isInCart(item.id)
                        ? removeFromCart(item.id)
                        : addToCart(item);
                    }}
                    className={`block text-center py-2 lg:py-3 rounded-2xl w-full cursor-pointer transition-all duration-300 font-medium my-2 ${
                      isInCart(item.id)
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-[#4275F6] text-white hover:bg-[#4278F9]"
                    }`}
                  >
                    {isInCart(item.id) ? "Remove from Cart" : "Add to Cart"}
                  </button>
                ) : (
                  <Link
                    to={`/auction-details/${item?.slug}`}
                    className="bg-[#4275F6] text-white block text-center py-2 lg:py-3 rounded-2xl w-full hover:bg-[#4278F9] cursor-pointer transition-all duration-300 font-medium my-2"
                  >
                    Quick Bid
                  </Link>
                )}
              </div>
            </Link>
          ))
        )}
      </div>

      {!isLoadingState && displayProducts.length > 0 && (
        <div className="flex justify-end items-end mt-6">
          <ReactPaginate
            breakLabel="..."
            nextLabel={""}
            previousLabel={""}
            pageCount={filterProducts.length > 0 ? totalPage2 : totalPage}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            onPageChange={(event) => {
              if (filterProducts.length > 0) {
                setPage2(event.selected + 1);
              } else {
                setPage(event.selected + 1);
              }

              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            containerClassName="flex items-center md:gap-3 gap-1 flex-wrap"
            previousClassName="md:px-4 px-2 py-2 text-sm font-medium text-gray-700 bg-white rounded-md cursor-pointer xxs:block hidden"
            nextClassName="md:px-4 px-2 py-2 text-sm font-medium text-gray-700 bg-white rounded-md cursor-pointer xxs:block hidden"
            activeLinkClassName="font-[700] bg-[#4275F6] rounded-full !text-white border-none"
            disabledClassName="bg-none cursor-not-allowed"
            breakClassName="md:px-4 px-2 py-2 text-sm font-medium text-gray-700"
            pageLinkClassName="w-[42px] cursor-pointer h-[42px] border-[1px] border-primary flex justify-center items-center text-black rounded-xl"
            forcePage={filterProducts.length > 0 ? page2 - 1 : page - 1}
          />
        </div>
      )}
    </div>
  );
};

export default SimpleProductCard;

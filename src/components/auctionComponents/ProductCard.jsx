import React, { useState } from "react";
import { HeartShape } from "../common/CustomIcon";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

const ProductCard = ({ products, isLoading }) => {
  const [likedItems, setLikedItems] = useState([]);
  const axiosSecure = useAxiosSecure();
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { user } = useAuth();
  const BookmarkMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("/bookmark", data); // expects { product_id: ... }
      return { ...response.data, productId: data.product_id }; // attach productId so you can access it in onSuccess
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

  const UnbookmarkMutation = useMutation({
    mutationFn: async (data) => {
      // const response = await axiosSecure.post("/bookmark", data); // Adjust endpoint if it's DELETE
      return data.product_id;
    },
    onSuccess: (productId) => {
      toast.success("Bookmark removed successfully");
      setLikedItems((prev) => prev.filter((id) => id !== productId));
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to remove bookmark.";
      toast.error(errorMessage);
    },
  });

  // const totalItems = dummyItems.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const paginatedItems = dummyItems.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  // const handleItemsPerPageChange = (e) => {
  //   setItemsPerPage(parseInt(e.target.value));
  //   setCurrentPage(1);
  // };

  // const goToPage = (page) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  const options = [
    {
      label: "Current Bid",
      value: "current bid",
    },
    {
      label: "Previous Bid",
      value: "previous bid",
    },
    {
      label: "Next Bid",
      value: "next bid",
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-2 border-[#cac3c3] px-4 py-3 rounded-md w-full gap-4 md:gap-0">
        <div className="flex items-center gap-4 w-full sm:w-[65%]">
          <p className="text-sm t sm:text-base">Sort By :</p>

          <div className="relative w-full max-w-[180px]">
            <select
              className="appearance-none w-full px-4 py-2 md:py-3 border-none outline-none text-gray-700 bg-[#F0F0F0] rounded"
              defaultValue=""
            >
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-black text-sm md:text-base"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        <p className="text-[#595858] text-sm sm:text-base">24 items per page</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xmd:grid-cols-2 lg:grid-cols-2 xlg:grid-cols-3 gap-4 mt-8">
        {isLoading
          ? Array(6)
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
          : products?.data?.data?.map((item) => (
              <div key={item.id} className="border border-[#CAC3C3] rounded-xl">
                <div className="h-[200px]">

                <img
                  className="w-full  h-full object-cover rounded-xl"
                  src={VITE_IMG_URL + item.images[0]}
                  alt="image"
                />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="my-1">
                      <p className="text-[14px] text-[#0C0D19]">{item.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] text-[#A8A8A8]">
                          Current bid
                        </p>
                        <p className="text-[15px] font-semibold text-[#0C0D19]">
                          {item.bid}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (likedItems.includes(item.id)) {
                          UnbookmarkMutation.mutate({ product_id: item.id });
                        } else {
                          BookmarkMutation.mutate({ product_id: item.id });
                        }
                      }}
                      className="transition-all"
                    >
                      <HeartShape filled={likedItems.includes(item.id)} />
                    </button>
                  </div>
                  {/* <p className="text-[12px] text-[#161515] my-1">
                    <span className="text-[#EE0B0B]">{item.bids.length} </span>·
                    Time Ended ({item.time})
                  </p> */}
                  {/* <p className="text-[12px] text-[#161515] my-1">
                    +$19.15 delivery
                  </p> */}
                  <p className="text-[12px] text-[#161515] my-1">
                    From {item.country}
                  </p>
                  <Link
                    to={`/auction-details/${item?.slug}`}
                    className="bg-[#4275F6] text-white block text-center py-2 lg:py-3 rounded-2xl w-full hover:bg-[#4278F9] cursor-pointer transition-all duration-300 font-medium my-2"
                  >
                    Quick Bid
                  </Link>
                </div>
              </div>
            ))}
      </div>
      {/* <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t pt-4 gap-4">
 
        <div className="flex items-center gap-3 text-sm text-[#595858]">
          <span>
            {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border px-3 py-1 rounded-md bg-white"
          >
            {[5, 10, 20].map((num) => (
              <option key={num} value={num}>
                {num} per page
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // Show first, last, current, and nearby pages
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              );
            })
            .map((page, i, arr) => {
              const prevPage = arr[i - 1];
              const isEllipsis = prevPage && page - prevPage > 1;

              return isEllipsis ? (
                <span key={`ellipsis-${i}`} className="px-2">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-[#4275F6] text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ProductCard;

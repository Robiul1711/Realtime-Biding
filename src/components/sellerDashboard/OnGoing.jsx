import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EditListingForm from "./Edit/EditListingForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";

const OnGoing = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const [page, setPage] = useState(1);

  const {
    data: AllSellerProduct = { data: [] }, // Default value to prevent undefined errors
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["ongoing-products", page],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/auctions/running?page=${page}`);

        return res?.data;
      } catch (err) {
        console.error("Error fetching products:", err);
        return { data: [] }; // Return empty array on error
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // useEffect(() => {
  //   if (!Array.isArray(AllSellerProduct?.data)) return;

  //   const calculateTimeLeft = () => {
  //     const newTimeLeft = {};

  //     AllSellerProduct.data.forEach((item) => {
  //       if (item?.auction_end_at) {
  //         const endDate = new Date(item.auction_end_at);
  //         const now = new Date();
  //         const difference = endDate - now;

  //         if (difference > 0) {
  //           const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  //           const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  //           const minutes = Math.floor((difference / 1000 / 60) % 60);
  //           const seconds = Math.floor((difference / 1000) % 60);

  //           newTimeLeft[item.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  //         } else {
  //           newTimeLeft[item.id] = "Auction ended";
  //         }
  //       }
  //     });

  //     setTimeLeft(newTimeLeft);
  //   };

  //   calculateTimeLeft();
  //   const timer = setInterval(calculateTimeLeft, 1000);
  //   return () => clearInterval(timer);
  // }, [AllSellerProduct?.data]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (error)
    return (
      <p className="text-red-500 text-center py-10">
        Something went wrong while fetching products
      </p>
    );

  // Ensure products is always an array before mapping
  const products = Array.isArray(AllSellerProduct?.data?.data)
    ? AllSellerProduct?.data?.data
    : [];

  console.log(AllSellerProduct?.data);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? // Skeleton loading state
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="border border-[#E5E5E5] bg-white rounded-lg"
              >
                <Skeleton height={250} className="w-full" />
                <div className="p-3 flex flex-col gap-3">
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="60%" height={16} />
                  <Skeleton width="70%" height={16} />
                  <div className="flex justify-between mt-2">
                    <Skeleton width={60} height={16} />
                    <Skeleton width={60} height={32} />
                  </div>
                </div>
              </div>
            ))
          : // Actual content
            products?.map((item) => (
              <Link
                to={`/auction-details/${item?.slug}`}
                key={item.id}
                className="border border-[#E5E5E5] bg-white text-black rounded-lg relative hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={`${import.meta.env.VITE_IMG_URL + item.images[0]}`}
                  alt={item.title}
                  className="w-full h-[250px] object-contain"
                />
                <div className="p-3 flex flex-col gap-1">
                  <Title level="title12">{item.title}</Title>
                  <Title level="title14" className="text-[#A8A8A8]">
                    Biding Price now{" "}
                    <span className="font-bold ml-2 text-black">
                      {item.bid}
                    </span>
                  </Title>
                  {item?.auction_end_at && (
                    <div className="pb-1">
                      <p className="text-[#001AFF]">
                        Time left: {timeLeft[item.id] || "Over"}
                      </p>
                    </div>
                  )}
                  <div className="w-full flex items-center justify-between gap-2">
                    <Title level="title12">{item?.country}</Title>
                    <Button
                      type="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(item);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      <Modal
        title="Edit Product Listing"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1000}
      >
        {selectedProduct && (
          <EditListingForm
            key={selectedProduct?.id}
            product={selectedProduct}
            onSuccess={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
      <div className="flex justify-end items-end mt-6 py-3">
        <ReactPaginate
          breakLabel="..."
          nextLabel={""}
          previousLabel={""}
          pageCount={AllSellerProduct?.data?.last_page}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={(event) => {
            setPage(event.selected + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          containerClassName="flex items-center md:gap-3 gap-1 flex-wrap"
          previousClassName="md:px-4 px-2 py-2 text-sm font-medium text-gray-700 bg-white rounded-md cursor-pointer xxs:block hidden"
          nextClassName="md:px-4 px-2 py-2 text-sm font-medium text-gray-700 bg-white rounded-md cursor-pointer xxs:block hidden"
          activeLinkClassName="font-[700] bg-[#4275F6] rounded-full !text-white border-none"
          disabledClassName="bg-none cursor-not-allowed"
          breakClassName="md:px-4 px-2 py-2 text-sm font-medium text-gray-700"
          pageLinkClassName="w-[42px] cursor-pointer h-[42px] border-[1px] border-primary flex justify-center items-center text-black rounded-xl"
          forcePage={page - 1}
        />
      </div>
    </div>
  );
};

export default OnGoing;

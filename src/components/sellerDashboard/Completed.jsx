import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Title from "../common/Title";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactPaginate from "react-paginate";
import { FiPackage } from "react-icons/fi";

const Completed = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const {
    data: CompletedProduct,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["completed-product", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/auctions/completed?page=${page}`);
      return res.data;
    },
  });

  if (error) {
    return (
      <div className="section-gap text-center">
        <Title level="title32" className="mb-6">
          Completed Auctions
        </Title>
        <p className="text-red-500">
          Failed to load completed auctions. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <Title level="title32" className="mb-6 text-center">
        Completed Auctions
      </Title>

      {/* Empty State */}
      {!isLoading && CompletedProduct?.data?.data?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <FiPackage className="text-gray-400 text-4xl" />
          </div>
          <Title level="title18" className="text-gray-600 mb-2">
            No Completed Auctions Found
          </Title>
          {/* <p className="text-gray-500 max-w-md text-center">
            There are currently no completed auctions available. Check back later or explore our active auctions.
          </p>
          <Link
            to="/auctions"
            className="mt-4 inline-block text-center text-sm text-white bg-black px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Browse Active Auctions
          </Link> */}
        </div>
      )}

      {/* Grid Content */}
      {!isLoading && CompletedProduct?.data?.data?.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CompletedProduct?.data?.data?.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={
                    item.images?.[0]
                      ? `${import.meta.env.VITE_IMG_URL}${item.images[0]}`
                      : "https://via.placeholder.com/250"
                  }
                  alt={item.title}
                  className="w-full h-[220px] object-contain bg-gray-50"
                />

                <div className="p-4 flex flex-col gap-2">
                  <Title level="title14" className="text-black line-clamp-1">
                    {item.title}
                  </Title>

                  <p className="text-sm text-gray-600">
                    Bidding Price:{" "}
                    <span className="font-semibold text-black">
                      {item.bid ? `$${item.bid}` : "N/A"}
                    </span>
                  </p>

                  {item.country && (
                    <p className="text-sm text-gray-500">
                      From: {item.country}
                    </p>
                  )}

                  <p className="text-xs text-gray-400">
                    Auction Ended:{" "}
                    {new Date(item.auction_end_at).toLocaleDateString()}
                  </p>

                  {item.winner ? (
                    <p className="text-xs text-green-600 font-medium">
                      Winner: {item.winner.name}
                    </p>
                  ) : (
                    <p className="text-xs text-red-500">No Winner Assigned</p>
                  )}

                  <Link
                    to={`/auction-details/${item.slug}`}
                    className="mt-2 inline-block text-center text-sm text-white bg-black px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-end mt-6 py-3">
            <ReactPaginate
              breakLabel="..."
              nextLabel={""}
              previousLabel={""}
              pageCount={CompletedProduct?.data?.last_page}
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
        </>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <Skeleton height={220} className="w-full" />
              <div className="p-4 flex flex-col gap-3">
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={16} />
                <Skeleton width="50%" height={16} />
                <Skeleton width="70%" height={14} />
                <Skeleton width="50%" height={14} />
                <Skeleton width="100%" height={36} className="mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Completed;
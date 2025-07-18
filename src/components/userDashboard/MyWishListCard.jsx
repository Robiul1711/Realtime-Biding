import React from "react";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MyWishListCard = ({ bookmark, isLoading }) => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;

  return (
    <div className="wishlist-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading ? (
          // Skeleton loading state (8 items)
          Array.from({ length: 8 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="border border-[#E5E5E5] bg-white rounded-lg">
              <Skeleton height={200} className="w-full" />
              <div className="p-3 flex flex-col gap-3">
                <div className="flex justify-between">
                  <Skeleton width={120} height={18} />
                  <Skeleton width={16} height={16} circle />
                </div>
                <Skeleton width={100} height={16} />
                <Skeleton width={80} height={16} />
                <Skeleton width={120} height={16} />
              </div>
            </div>
          ))
        ) : bookmark?.data?.data?.length > 0 ? (
          // Actual wishlist items
          bookmark.data.data.map((item, index) => {
            const product = item.product;
            if (!product) return null;

            return (
              <div
                key={`wishlist-${index}`}
                className="border border-[#E5E5E5] bg-white text-black rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={product.images?.[0] ? VITE_IMG_URL + product.images[0] : '/placeholder-image.jpg'}
                  alt={product.title || 'Product image'}
                  className="w-full h-[200px] object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <Title level="title12" className="line-clamp-1">
                      {product.title || 'No title available'}
                    </Title>
                    <span className="text-[#F00]">
                      <FaHeart />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <Title level="title14" className="text-[#A8A8A8]">
                      Your bid{" "}
                      <span className="font-bold ml-2 text-black">
                        {product.bid || 'N/A'}
                      </span>
                    </Title>
                  </div>
                  <Title level="title12">
                    <span className="text-[#F00]">
                      {product.bids?.length || 0} bids
                    </span>
                  </Title>
                  <Title level="title12">
                    From {product.country || 'Unknown'}
                  </Title>
                </div>
              </div>
            );
          })
        ) : (
          // Empty state
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Your wishlist is empty</p>
            <Link 
              to="/auctions" 
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Browse auctions
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishListCard;
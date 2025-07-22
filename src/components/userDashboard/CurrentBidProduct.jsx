import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CurrentBidProduct = ({ products=[], isLoading = false }) => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;

  // Safely access the nested data structure and sort by created_at (newest first)
  const sortedProducts = products 
    ? [...products].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      })
    : [];

    console.log(products)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {isLoading ? (
        // Skeleton loading state
        Array(6)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="border border-[#CAC3C3] bg-white rounded-xl overflow-hidden"
            >
              <Skeleton height={200} className="w-full" />
              <div className="p-4">
                <Skeleton height={20} width="80%" className="mb-3" />
                <div className="flex justify-between mb-3">
                  <Skeleton height={16} width={80} />
                  <Skeleton height={16} width={60} />
                </div>
                <Skeleton height={14} width="70%" className="mb-2" />
                <Skeleton height={14} width="60%" className="mb-4" />
                <Skeleton height={40} className="rounded-2xl" />
              </div>
            </div>
          ))
      ) : sortedProducts.length > 0 ? (
        // Actual product cards
        sortedProducts.map((item) => (
          <div
            key={item.id}
            className="border border-[#CAC3C3] bg-white rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="h-[200px] overflow-hidden rounded-xl ">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={
                  item.product?.images?.[0]
                    ? VITE_IMG_URL + item.product.images[0]
                    : "/placeholder-image.jpg"
                }
                alt={item.product?.title || "Auction item"}
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="my-1">
                  <p className="text-[14px] text-[#0C0D19] font-medium">
                    {item.product?.title || "No title available"}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] text-[#A8A8A8]">Current bid</p>
                    <p className="text-[15px] font-semibold text-[#0C0D19]">
                      ${item.amount?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-[#161515] my-1">
                {/* <span className="text-[#EE0B0B]">
                  {item.bid_count || 0} bids
                </span>{" "} */}
                · Time Ended (
                {new Date(item.product?.auction_end_at).toLocaleDateString()})
              </p>
              <p className="text-[12px] text-[#161515] my-1">
                From {item.product?.country || "Unknown"}
              </p>
              <Link to={`/auction-details/${item.product_id}`}>
                <button className="bg-[#4275F6] text-white py-2 md:py-3 rounded-2xl w-full hover:bg-[#4278F9] cursor-pointer transition-all duration-300 font-medium my-2">
                  Quick Bid
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        // Empty state
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">No current bids found</p>
          <Link
            to="/auctions"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Browse available auctions
          </Link>
        </div>
      )}
    </div>
  );
};

export default CurrentBidProduct;
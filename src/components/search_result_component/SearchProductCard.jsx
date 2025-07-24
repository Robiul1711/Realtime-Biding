import Title from "../common/Title";
import { Link } from "react-router-dom";

const SearchProductCard = ({ searchResults, isLoading }) => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const formatPrice = (price) => {
    return price ? `$${parseFloat(price).toLocaleString()}` : "";
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
      <div className="h-64 bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 ">
      {searchResults.map((item) => (
        <Link
          to={
            item.type === "auction"
              ? `/auction-details/${item.slug}`
              : `/search-product-details/${item.slug}`
          }
          key={item.id}
          className="group"
        >
          <div className="relative border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
            {/* Product Image */}
            <div className="h-64 overflow-hidden">
              <img
                src={IMG_URL + item.first_image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Title level="title12" className="font-semibold text-black">
                  {item.title.length > 25
                    ? item.title.slice(0, 25) + "..."
                    : item.title}
                </Title>
                <Title level="title14" className="text-sm text-gray-500">
                  {item.type === "sale"
                    ? formatPrice(item?.price)
                    : item.type === "auction"
                    ? formatPrice(item?.starting_price)
                    : ""}
                </Title>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchProductCard;
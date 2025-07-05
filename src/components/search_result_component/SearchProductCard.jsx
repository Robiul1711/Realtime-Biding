import React, { useState } from "react";
import today from "../../assets/images/cap.png";
import product2 from "../../assets/images/product2.png";
import Title from "../common/Title";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HeartShape } from "../common/CustomIcon";

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
  {
    id: 11,
    image: product2,
    title: "Vintage Collection Item 11",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 12,
    image: today,
    title: "Vintage Collection Item 12",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 13,
    image: product2,
    title: "Vintage Collection Item 13",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 14,
    image: today,
    title: "Vintage Collection Item 14",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 15,
    image: product2,
    title: "Vintage Collection Item 15",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    id: 16,
    image: today,
    title: "Vintage Collection Item 16",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
];

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-black" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-black" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-black" />);
    }
  }
  return stars;
};

const SearchProductCard = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? data : data.slice(0, 10);

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleData.map((item, index) => (
          <Link to="/search-product-details" key={index}>
            <div className="border border-[#E5E5E5] rounded-lg hover:shadow cursor-pointer relative">
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className="transition-all"
                >
                  <HeartShape filled={likedItems.includes(item.id)} />
                </button>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[300px] md:h-auto object-cover"
              />
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
                <div className="flex items-center gap-1">
                  <div className="flex">{renderStars(item.ratting)}</div>
                  <Title level="title12" className="text-sm text-[#7E7E7E]">
                    {item.review}
                  </Title>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && data.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-[#4275F6] text-white rounded hover:bg-gray-800 transition"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchProductCard;

import React, { useState } from "react";
import today from "../../assets/images/cap.png";
import Title from "../common/Title";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const data = [
  {
    image: today,
    title: "Vintage Collection Item 1",
    price: "$24,500",
    review: "100 reviews",
    ratting: 2,
  },
  {
    image: today,
    title: "Vintage Collection Item 2",
    price: "$18,300",
    review: "100 reviews",
    ratting: 4,
  },
  {
    image: today,
    title: "Vintage Collection Item 3",
    price: "$32,100",
    review: "100 reviews",
    ratting: 5,
  },
  {
    image: today,
    title: "Vintage Collection Item 4",
    price: "$25,000",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 5",
    price: "$21,700",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    review: "100 reviews",
    ratting: 4.5,
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
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
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? data : data.slice(0, 10);

  return (
    <div>
      <Link to={"/search-product-details"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleData.map((item, index) => (
            <div key={index} className="border border-[#E5E5E5] rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
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
      </Link>
    </div>
  );
};

export default SearchProductCard;

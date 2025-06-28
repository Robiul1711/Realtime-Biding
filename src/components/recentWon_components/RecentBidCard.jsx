import React, { useState } from "react";
import today from "../../assets/images/today.png";
import Title from "../common/Title";
import { Link } from "react-router-dom";

const data = [
  {
    image: today,
    title: "Vintage Collection Item 1",
    price: "$24,500",
    location: "from Australia",
  },
  {
    image: today,
    title: "Vintage Collection Item 2",
    price: "$18,300",
    location: "from USA",
  },
  {
    image: today,
    title: "Vintage Collection Item 3",
    price: "$32,100",
    location: "from UK",
  },
  {
    image: today,
    title: "Vintage Collection Item 4",
    price: "$25,000",
    location: "from Germany",
  },
  {
    image: today,
    title: "Vintage Collection Item 5",
    price: "$21,700",
    location: "from France",
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    location: "from Italy",
  },
];

const RecentBidCard = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? data : data.slice(0, 5);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {visibleData.map((item, index) => (
          <Link
            to={"/recent-won-details"}
            key={index}
            className="border border-[#E5E5E5] rounded-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover"
            />
            <div className="p-3 flex flex-col gap-1">
              <Title level="title12">{item.title}</Title>
              <Title level="title14" className="text-[#A8A8A8]">
                Last bid{" "}
                <span className="font-bold ml-2 text-black">{item.price}</span>
              </Title>
              <Title level="title12">{item.location}</Title>
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

export default RecentBidCard;

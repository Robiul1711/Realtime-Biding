import React from "react";
import car from "@/assets/images/car.png";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
const data = [
  {
    image: car,
    title: "Electronics",
  },
  {
    image: car,
    title: "Home & Kitchen",
  },
  {
    image: car,
    title: "Sports & Outdoors",
  },
  {
    image: car,
    title: "Health & Beauty",
  },
  {
    image: car,
    title: "Health & Beauty",
  },
  {
    image: car,
    title: "Health & Beauty",
  },
  {
    image: car,
    title: "Health & Beauty",
  },
];
const TrendingOn = () => {
  return (
    <div className="section-padding-x py-10">
      <div className="flex justify-between items-center mb-5">
        <Title level="title40">Trending On</Title>
        <p className="text-red-500  flex items-center gap-2">
          Show All <FiArrowUpRight className="text-2xl" />
        </p>
      </div>

      <div>
        <Link
          to={"/auction-list"}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-center border p-10 rounded-2xl items-center flex-col gap-3"
            >
              <img
                className="w-full h-full object-contain"
                src={item.image}
                alt={item.title}
              />
              <Title level="title18">{item.title}</Title>
            </div>
          ))}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center mt-10 bg-[#EAEAEA] p-10 rounded-2xl">
        <div>
          <Title level="title48">Bid Smart, Win Big!</Title>
          <Title level="title16" className="text-gray-600 mt-2">
            Experience secure auctions, reliable deals, and hassle-free bidding.
          </Title>
        </div>
        <Link to={"/auction-list"} className="mt-6 md:mt-0">
          <button className="bg-[#FB0000] text-white px-8 cursor-pointer py-3 md:py-4 rounded-full">
            Start now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingOn;

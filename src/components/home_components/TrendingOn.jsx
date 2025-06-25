import React from "react";
import car from "@/assets/images/car.png";
import Title from "../common/Title";
import { FiArrowUpRight } from "react-icons/fi";
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
        <p className="text-red-500  flex items-center gap-2">Show All <FiArrowUpRight  className="text-2xl"/></p>
      </div>

      <div className="flex justify-between  gap-4 flex-wrap ">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-center border  p-10 rounded-2xl items-center flex-col gap-3"
          >
            <img src={item.image} alt={item.title} />
            <Title level="title18">{item.title}</Title>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10 bg-[#EAEAEA] p-10 rounded-2xl">
        <div>

        <Title level="title48" >Bid Smart, Win Big!</Title>
        <Title level="title16" className="text-gray-600 mt-2">Experience secure auctions, reliable deals, and hassle-free bidding.</Title>
        </div>
        <button className="bg-[#FB0000] text-white px-8 cursor-pointer py-4 rounded-full">Start now</button>
      </div>
    </div>
  );
};

export default TrendingOn;

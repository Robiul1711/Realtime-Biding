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
       delevary: "+$19.15 delivery",
         time: "2d 3h 25m",
  },
  {
    image: today,
    title: "Vintage Collection Item 2",
    price: "$18,300",
    location: "from USA",
       delevary: "+$19.15 delivery",
         time: "2d 3h 25m",
  },
  {
    image: today,
    title: "Vintage Collection Item 3",
    price: "$32,100",
    location: "from UK",
       delevary: "+$19.15 delivery",
         time: "2d 3h 25m",
  },
  {
    image: today,
    title: "Vintage Collection Item 4",
    price: "$25,000",
    location: "from Germany",
       delevary: "+$19.15 delivery",
         time: "2d 3h 25m",
  },
  {
    image: today,
    title: "Vintage Collection Item 5",
    price: "$21,700",
    location: "from France",
       delevary: "+$19.15 delivery",
         time: "2d 3h 25m",
  },
  {
    image: today,
    title: "Vintage Collection Item 6",
    price: "$29,400",
    location: "from Italy",
    delevary: "+$19.15 delivery",
    time: "2d 3h 25m",
  },
];

const OnGoing = () => {


  return (
    <div>
      <Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <div key={index} className="border border-[#E5E5E5] bg-white text-black rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
              />
              <div className="p-3 flex flex-col gap-1">
                <Title level="title12">{item.title}</Title>
                <Title level="title14" className="text-[#A8A8A8]">
                Biding Price now{" "}
                  <span className="font-bold ml-2 text-black">
                    {item.price}
                  </span>
                </Title>
                <div className="pb-1">
                    <p className="text-[#001AFF]">Time left</p>
                    <p className="text-[#F40202]">2d 3h 25m</p>
                </div>
                <Title level="title12">{item.delevary}</Title>
                <Title level="title12">{item.location}</Title>
              </div>
            </div>
          ))}
        </div>

      </Link>
    </div>
  );
};

export default OnGoing;


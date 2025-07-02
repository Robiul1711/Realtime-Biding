import React, { useState } from "react";
import card from "../../assets/images/card.png";
import card1 from "../../assets/images/card9.png";
import card2 from "../../assets/images/card1.png";
import card3 from "../../assets/images/card2.png";
import card4 from "../../assets/images/card3.png";
import card5 from "../../assets/images/card4.png";
import card6 from "../../assets/images/card5.png";
import card7 from "../../assets/images/card6.png";
import card8 from "../../assets/images/card7.png";
import card9 from "../../assets/images/card8.png";
import card10 from "../../assets/images/card10.png";
import { HeartShape } from "../common/CustomIcon";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
const dummyItems = [
  {
    id: 1,
    title: "Vintage Collection Item 1",
    currentBid: "$24,500",
    bids: "0 bids",
    time: "Today 11:50 AM",
    delivery: "+$19.15 delivery",
    location: "from Australia",
    image: card,
  },
  {
    id: 2,
    title: "Vintage Collection Item 2",
    currentBid: "$25,000",
    bids: "3 bids",
    time: "Today 12:10 PM",
    delivery: "+$20.00 delivery",
    location: "from Australia",
    image: card1,
  },
  {
    id: 3,
    title: "Vintage Collection Item 3",
    currentBid: "$22,800",
    bids: "1 bid",
    time: "Today 2:30 PM",
    delivery: "+$18.00 delivery",
    location: "from Australia",
    image: card2,
  },
  {
    id: 4,
    title: "Vintage Collection Item 4",
    currentBid: "$26,000",
    bids: "5 bids",
    time: "Today 3:00 PM",
    delivery: "+$21.00 delivery",
    location: "from Australia",
    image: card3,
  },
//   {
//     id: 5,
//     title: "Vintage Collection Item 5",
//     currentBid: "$23,300",
//     bids: "2 bids",
//     time: "Today 4:20 PM",
//     delivery: "+$19.75 delivery",
//     location: "from Australia",
//     image: card4,
//   },
//   {
//     id: 6,
//     title: "Vintage Collection Item 6",
//     currentBid: "$27,450",
//     bids: "4 bids",
//     time: "Today 5:45 PM",
//     delivery: "+$22.10 delivery",
//     location: "from Australia",
//     image: card5,
//   },
//   {
//     id: 7,
//     title: "Vintage Collection Item 7",
//     currentBid: "$28,100",
//     bids: "3 bids",
//     time: "Today 6:00 PM",
//     delivery: "+$20.50 delivery",
//     location: "from Australia",
//     image: card6,
//   },
//   {
//     id: 8,
//     title: "Vintage Collection Item 8",
//     currentBid: "$29,000",
//     bids: "6 bids",
//     time: "Today 6:30 PM",
//     delivery: "+$21.30 delivery",
//     location: "from Australia",
//     image: card7,
//   },
//   {
//     id: 9,
//     title: "Vintage Collection Item 9",
//     currentBid: "$21,700",
//     bids: "1 bid",
//     time: "Today 7:00 PM",
//     delivery: "+$18.90 delivery",
//     location: "from Australia",
//     image: card8,
//   },
//   {
//     id: 10,
//     title: "Vintage Collection Item 10",
//     currentBid: "$30,000",
//     bids: "8 bids",
//     time: "Today 7:45 PM",
//     delivery: "+$23.15 delivery",
//     location: "from Australia",
//     image: card9,
//   },
//   {
//     id: 11,
//     title: "Vintage Collection Item 11",
//     currentBid: "$24,999",
//     bids: "0 bids",
//     time: "Today 8:00 PM",
//     delivery: "+$19.99 delivery",
//     location: "from Australia",
//     image: card10,
//   },
//   {
//     id: 12,
//     title: "Vintage Collection Item 12",
//     currentBid: "$22,400",
//     bids: "1 bid",
//     time: "Today 9:00 PM",
//     delivery: "+$20.45 delivery",
//     location: "from Australia",
//     image: card4,
//   },
];

const CurrentBidProduct = () => {

  const [likedItems, setLikedItems] = useState([]);
  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  return (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {dummyItems.map((item) => (
          <div key={item.id} className="border border-[#CAC3C3] bg-white rounded-xl">
            <img className="w-full" src={item.image} alt="image" />
            <div className="p-4 ">
              <div className="flex justify-between items-center">
                <div className="my-1">
                  <p className="text-[14px] text-[#0C0D19]">{item.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] text-[#A8A8A8]">Current bid</p>
                    <p className="text-[15px] font-semibold text-[#0C0D19]">
                      {item.currentBid}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleLike(item.id)}
                  className="transition-all"
                >
                  <HeartShape filled={likedItems.includes(item.id)} />
                </button>
              </div>
              <p className="text-[12px] text-[#161515] my-1">
                <span className="text-[#EE0B0B]">{item.bids} </span>· Time Ended
                ({item.time})
              </p>
              <p className="text-[12px] text-[#161515] my-1">{item.delivery}</p>
              <p className="text-[12px] text-[#161515] my-1">{item.location}</p>
              <Link >
                <button className="bg-[#4275F6] text-white py-2 md:py-3 rounded-2xl w-full hover:bg-[#4278F9] cursor-pointer transition-all duration-300 font-medium my-2">
                  Quick Bid
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

  );
};

export default CurrentBidProduct;


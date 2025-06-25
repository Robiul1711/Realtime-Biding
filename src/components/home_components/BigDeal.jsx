import React from "react";
import bigdeal from "../../assets/images/bigdeal.png";
const BigDeal = () => {
  return (
    <div className="section-padding-x py-10 ">
      <div className=" flex justify-between bg-[#E9E9E9] pt-10 px-10 rounded-2xl">
        <div>
          <h2 className="text-[40px] text-[#253D4E] max-w-[750px] font-bold mb-4">
            Stay In, Bid Big – Win Amazing Deals from the Comfort of Your
          </h2>
          <p className="text-lg text-[#7E7E7E]">
            Secure the Best Deals, Every Time!
          </p>
          <div className="relative w-full max-w-md mt-5">
            <input
              type="email"
              className="outline-none bg-white rounded-full w-full py-4 pr-36 pl-4 "
              placeholder="Enter your email"
            />
            <button className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#FB0000] text-white px-6 py-4 rounded-full hover:bg-red-700 transition">
              Subscribe
            </button>
          </div>
        </div>
        <img src={bigdeal} alt="Big Deal" className="" />
      </div>
    </div>
  );
};

export default BigDeal;

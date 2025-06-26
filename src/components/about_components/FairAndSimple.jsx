import React from "react";
import fair from "../../assets/images/fair.png";
import Title from "../common/Title";

const sections = [
  {
    id: 1,
    tag: "Fees",
    title: "Fair & Simple Auction Fees",
    description:
      "The Hobby Nexus listing and auction fees are $.25 listing fee for all auctions and a 6% auction closing fee on the sale for all listings. If there are no bids on the auction, the listing fee includes up to 6 listings per item till it sells. After 6 listings, the item will have to be relisted at $.25 listing fee.",
    image: fair,
  },
  {
    id: 2,
    tag: "Terms and conditions ",
    title: "Our Community Guidelines",
    description:
      "The Hobby Nexus listing and auction fees are $.25 listing fee for all auctions and a 6% auction closing fee on the sale for all listings. If there are no bids on the auction, the listing fee includes up to 6 listings per item till it sells. After 6 listings, the item will have to be relisted at $.25 listing fee.",
    image: fair,
  },
  {
    id: 3,
    tag: "Shipping ",
    title: "Shipping & Buyer Protection",
    description:
      "The Hobby Nexus listing and auction fees are $.25 listing fee for all auctions and a 6% auction closing fee on the sale for all listings. If there are no bids on the auction, the listing fee includes up to 6 listings per item till it sells. After 6 listings, the item will have to be relisted at $.25 listing fee.",
    image: fair,
  },
];

const FairAndSimple = () => {
  return (
    <section className="section-padding-x pb-14 bg-white">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 mb-16 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex flex-col gap-6 max-w-[700px]">
            <span className="px-6 py-2 rounded-full text-[#0046F9] bg-[#0046F9]/10 border border-[#0046F9] inline-block w-fit text-sm font-medium">
              {section.tag}
            </span>

            <Title level="title36" className="text-[#0046F9]">
              {section.title}
            </Title>

            <Title level="title16" className="text-gray-700">
              {section.description}
            </Title>
          </div>

          <div className="w-full md:w-auto">
            <img
              src={section.image}
              alt={section.title}
              className="w-full rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default FairAndSimple;

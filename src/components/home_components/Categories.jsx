import React from "react";

const Categories = () => {
  return (
    <div className="section-padding-x py-6 md:py-10  text-[#7E7E7E]">
      <div className="overflow-x-auto overflow-visible flex items-center justify-center pb-3">
        <ul className="flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap">
          {[
            "Explore (New!)",
            "Sports Cards",
            "TCG",
            "Sports Memorabilia",
            "Art",
            "Sport",
            "Industrial equipment",
          ].map((category, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-black transition"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;

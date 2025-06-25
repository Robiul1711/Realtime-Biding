import React from 'react';

const Categories = () => {
  return (
    <div className="section-padding-x py-10 flex items-center justify-center text-[#7E7E7E]">
      <ul className="flex flex-wrap gap-6 sm:gap-8 md:gap-10">
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
  );
};

export default Categories;

import React, { useState } from "react";

// react icons
import { FaMinus, FaPlus } from "react-icons/fa6";

const Accordion = ({ product }) => {
  const [isPlusAccording, setIsPlusAccording] = useState(null);

  const handleBorderClick = (index) =>
    setIsPlusAccording((prevIndex) => (prevIndex === index ? null : index));

  // Prepare the accordion data based on product props
  const accordingData = [
    {
      title: "Description",
      description: product?.description 
        ? <div dangerouslySetInnerHTML={{ __html: product.description }} /> 
        : "No description available",
    },
    {
      title: "Core features",
      description: product?.properties?.length > 0 ? (
        <ul className="list-disc pl-5">
          {product.properties.map((prop, index) => (
            <li key={index}>
              <span className="font-medium">{prop.title}: </span>
              {prop.value}
            </li>
          ))}
        </ul>
      ) : (
        "No features specified"
      ),
    },
    {
      title: "Shipping & return",
      description: `
        This item ships within ${product?.ship_within || '5'} days. 
        Buyer is responsible for return shipping costs. 
        Returns accepted within 14 days of delivery.
      `,
    },
    {
      title: "Care guide",
      description: product?.care_guide 
        ? product.care_guide 
        : "No specific care instructions provided",
    },
  ];

  return (
    <div className="border-t dark:border-slate-800 my-8">
      {/* accordian */}
      <div className="flex gap-3 md:gap-y-4 flex-col w-full mx-auto">
        {accordingData?.map((according, index) => (
          <article
            key={index}
            className="border-b dark:border-slate-800 p-3 md:p-5"
          >
            <div
              className="flex gap-2 cursor-pointer items-center justify-between w-full"
              onClick={() => handleBorderClick(index)}
            >
              <h2 className="text-black font-[600] md:text-[1.1rem]">
                {according.title}
              </h2>
              <p className="">
                {isPlusAccording === index ? (
                  <FaMinus className="text-sm md:text-[1.2rem] dark:text-slate-800" />
                ) : (
                  <FaPlus className="text-sm md:text-[1.2rem] dark:text-slate-800" />
                )}
              </p>
            </div>
            <div
              className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                isPlusAccording === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="text-[#707070] dark:text-[#abc2d3] text-sm md:text-[0.9rem] overflow-hidden">
                {according.description}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
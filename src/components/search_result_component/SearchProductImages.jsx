import React, { useState } from "react";
import product from "../../assets/images/product.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";
import { FaAngleRight } from "react-icons/fa6";

const SearchProductImages = () => {
  const [images, setImages] = useState([
    product,
    product3,
    product2,
    product3,
    product2,
  ]);
  const handleImageClick = (index) => {
    if (index === 0) return;
    const newImages = [...images];
    const temp = newImages[0];
    newImages[0] = newImages[index];
    newImages[index] = temp;
    setImages(newImages);
  };
  return (
    <div>
      <div className="flex items-center gap-1 text-gray-500 my-2">
        <span>Home</span>
        <FaAngleRight />
        <span>Search Results</span>
        <FaAngleRight />
        <span className="font-semibold">Product Name</span>
      </div>
      <div className="overflow-hidden rounded-lg">
        <img
          onClick={() => handleImageClick(0)}
          className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-auto md:h-[550px]  cursor-pointer"
          src={images[0]}
          alt="Main image"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {images.slice(1).map((img, i) => (
          <div
            key={i + 1}
            className="overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleImageClick(i + 1)}
          >
            <img
              className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-full"
              src={img}
              alt={`Thumbnail ${i + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProductImages;

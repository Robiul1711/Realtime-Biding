import React, { useState } from "react";
import live from "../../assets/images/live.png";
import live1 from "../../assets/images/live1.png";
import live2 from "../../assets/images/live2.png";
import live3 from "../../assets/images/live3.png";

const RecentWonCardDetails = () => {
  const [images, setImages] = useState([live, live1, live2, live3]);

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
      <div className="overflow-hidden rounded-lg">
        <img
          onClick={() => handleImageClick(0)}
          className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-auto md:h-[550px] cursor-pointer"
          src={images[0]}
          alt="Main image"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
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

      <p className="font-semibold text-[20px] md:text-[30px] lg:text-[40px] text-[#000000] my-2">
        Vintage Rolex Submariner 1680
      </p>

      <p className="text-[#878787] md:text-lg lg:text-xl">
        A rare opportunity to own a piece of horological history. This vintage
        Rolex Submariner 1680 from 1978 is in exceptional condition, featuring
        the original dial and bezel. The watch has been professionally serviced
        and comes with full documentation and box. A rare opportunity to own a
        piece of horological history. This vintage Rolex Submariner 1680 from
        1978 is in exceptional condition, featuring the original dial and bezel.
        The watch has been professionally serviced and comes with full
        documentation and box.
      </p>
    </div>
  );
};

export default RecentWonCardDetails;

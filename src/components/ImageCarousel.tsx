"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  { src: "/images/Storefront.jpeg", alt: "First slide", title: "Samsung S23", price: "Price: FG" },
  { src: "/images/image2.jpg", alt: "Second slide", title: "Second slide", price: "Price: FG" },
  { src: "/images/image3.jpg", alt: "Third slide", title: "Third slide", price: "Price: FG" },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // 3000ms = 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-[200px] pb-8">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <Image
              src={image.src}
              alt={image.alt}
              width={1920}
              height={200}
              className="object-cover w-full h-[200px]"
              layout="responsive"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full hover:bg-opacity-100"
      >
        ❮
      </button>
      <button
        onClick={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full hover:bg-opacity-100"
      >
        ❯
      </button>
    </div>
  );
};

export default ImageCarousel;

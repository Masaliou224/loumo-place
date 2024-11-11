"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";
import ImageCarousel from "./ImageCarousel";

export interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerName: string;
  contactDetails: string;
  genre: string;
  size: string;
  lengthType: string;
  fabric: string;
  color: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = 
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearchQuery && matchesCategory
    })

  const householdAppliances = [
    { title: "The air conditioner", price: "Price(FG)", src: "/images/Air conditionner.jpeg" },
    { title: "Oven", price: "Price(FG)", src: "/images/OvenJPG.jpg" },
    { title: "Refrigerator", price: "Price(FG)", src: "/images/Frigo.jpeg" },
    { title: "Dishwasher", price: "Price(FG)", src: "/images/Machine à laver.png" },
    { title: "Vacuum cleaner", price: "Price(FG)", src: "/images/Vacuum cleaner.jpeg" },
  ];

  const kitchenAndDiningItems = [
    { title: "Dining Table", price: "Price(FG)", src: "/images/Dining Table JPG.jpg" },
    { title: "Marmite", price: "Price(FG)", src: "/images/Marmite2.jpeg" },
    { title: "Plate Assiette", price: "Price(FG)", src: "/images/Plate Assiette.png" },
    { title: "Rechaud Gaz", price: "Price(FG)", src: "/images/Réchauds Gaz.jpeg" },
    { title: "Cafetière", price: "Price(FG)", src: "/images/Cafetière.jpeg" },
  ];

  const clothesItems = [
    { title: "Sweatshirt", price: "Price(FG)", src: "/images/Sweatshirt.jpeg" },
    { title: "Baby Clothes", price: "Price(FG)", src: "/images/Clothes Baby.jpeg" },
    { title: "Blouse", price: "Price(FG)", src: "/images/BlouseJPG.jpg" },
    { title: "Raincoat", price: "Price(FG)", src: "/images/Raincoat.png" },
  ];

  const beautyToysAndMoreItems = [
    { title: "Toner Set", price: "Price(FG)", src: "/images/Tondeuse.jpeg" },
    { title: "Beauty", price: "Price(FG)", src: "/images/Cosmetics.png" },
    { title: "Animal Plush", price: "Price(FG)", src: "/images/Animal plush.jpeg" },
    { title: "Toy", price: "Price(FG)", src: "/images/Toy.png" },
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="container mx-auto px-4 my-8">
      <div className="flex justify-between border-b mb-4">
          <button
            onClick={() => handleCategoryClick("All")}
            className={`p-2 hover:text-blue-500 ${selectedCategory === "All" ? "text-blue-500 font-bold" : ""}`}
          >
            All
          </button>
          {["Clothes", "Shoes", "Electronique", "Home", "Beauty, Toys and More", "Others"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category.toLowerCase())}
              className={`p-2 hover:text-blue-500 ${selectedCategory === category.toLowerCase() ? "text-blue-500 font-bold" : ""}`}
            >
              {category} <span className="ml-1">▼</span>
            </button>
          ))}
        </div>
        <ImageCarousel />

        {/* Section Template */}
        {[
          { title: "Household Appliance", items: householdAppliances },
          { title: "Kitchen & Dining", items: kitchenAndDiningItems },
        ].map((section, idx) => (
          <section key={idx} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {section.items.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 text-center cursor-pointer">
                  <Image 
                    src={item.src}
                    alt={item.title}
                    width={150}
                    height={150}
                    className="mx-auto mb-2"
                  />
                  <div className="">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        

        <div className="flex items-baseline flex-col md:flex-row gap-8">
          <div className="flex-1 p-6 shadow">
            {[
              { title: "Clothes All", items: clothesItems },
            ].map((section, idx) => (
              <section key={idx} className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <div className={
                  "ClothesAll"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                  : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
                }>
                  {section.items.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 text-center h-72 cursor-pointer">
                      <Image 
                        src={item.src}
                        alt={item.title}
                        width={150}
                        height={150}
                        className="mx-auto mb-2"
                      />
                      <div className="">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-600">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="flex-1 p-6 shadow">
            {[
              { title: "Beauty, Toys and More", items: beautyToysAndMoreItems },
            ].map((section, idx) => (
              <section key={idx} className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <div className={
                  "Beauty, Toys and More"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                  : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
                }>
                  {section.items.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 text-center h-72 cursor-pointer">
                      <Image 
                        src={item.src}
                        alt={item.title}
                        width={150}
                        height={150}
                        className="mx-auto mb-2"
                      />
                      <div className="">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-600">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default HomePage;

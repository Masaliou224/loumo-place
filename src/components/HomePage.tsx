"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";
import ImageCarousel from "./ImageCarousel";

const HomePage = () => {
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 my-8">
        <ImageCarousel />

        {/* Section Template */}
        {[
          { title: "Household Appliance", items: householdAppliances },
          { title: "Kitchen & Dining", items: kitchenAndDiningItems },
          { title: "Clothes All", items: clothesItems },
          { title: "Beauty, Toys and More", items: beautyToysAndMoreItems },
        ].map((section, idx) => (
          <section key={idx} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {section.items.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 text-center">
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

      <Footer />
    </>
  );
};

export default HomePage;

"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";

interface Product {
  id: number;
  productName: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("All");

  useEffect(() => {
    // Fetch products from local storage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    console.log(storedProducts);
    setProducts(storedProducts);
  }, []);

  const categories = [
    "Furniture",
    "electronique",
    "Clothes All",
    "Beauty, Toys and More",
  ];

  const productsByCategory = (category: string) => 
    products.filter(
      (product) => 
        product.category &&
        product.category.toLowerCase().includes(category.toLowerCase()) &&
        (product.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );


  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">

        <div>
          <input 
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {categories.map((category) => {
          const categoryProducts = productsByCategory(category);
          
          return (
            <div key={category} className="my-8">
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categoryProducts.length === 0 ? (
                  <p>No products available in this category.</p>
                ) : (
                  categoryProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={product.productName}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h5 className="text-lg font-bold mb-2">
                          {product.productName}
                        </h5>
                        <p>
                          <strong>Price:</strong> ${product.price}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

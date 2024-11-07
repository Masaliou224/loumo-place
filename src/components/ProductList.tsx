"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Image from "next/image";

export interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerName: string;
  contactDetails: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSeachQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    // Fetch products from local storage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = 
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearchQuery && matchesCategory;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeachQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold my-4">Product Listings</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input 
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            <option value="tools">Tools</option>
            <option value="clothes">Clothing</option>
            <option value="sports">Sports</option>
            <option value="funiture">Furniture</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Product Listings */}
        {filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
                  <p>{product.description}</p>
                  <p className="text-gray-700">
                    <strong>Price:</strong> FG{product.price}
                  </p>
                  <p className="text-gray-700">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="text-gray-700">
                    <strong>Seller:</strong> {product.sellerName}
                  </p>
                  <p className="text-gray-700">
                    <strong>Contact:</strong> {product.contactDetails}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
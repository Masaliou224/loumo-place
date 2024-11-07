"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import FilterSection from "./FilterSection";
import Footer from "./Footer";

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

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filters, setFilters] = useState({
    genre: "",
    size: "",
    lengthType: "",
    fabric: "",
    color: "",
  });
  const { addToCart } = useCart();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = 
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesFilters = 
      (!filters.genre || product.genre === filters.genre) &&
      (!filters.size || product.size === filters.size) &&
      (!filters.lengthType || product.lengthType === filters.lengthType) &&
      (!filters.fabric || product.fabric === filters.fabric) &&
      (!filters.color || product.color === filters.color);

    return matchesSearchQuery && matchesCategory && matchesFilters;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold my-4">Product Listing</h2>

        <div className="mb-4">
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

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

        <div className="flex gap-4">
          <div className="flex-none w-1/4 relative">
            <FilterSection setFilters={setFilters} />
          </div>

          {filteredProducts.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-3/4 flex-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <Link href={`/${product.id}`}>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-40 h-40 object-cover mx-auto"
                    />
                  )}
                  <div className="p-4">
                    <h5 className="text-lg font-bold mb-2">
                      {product.productName}
                    </h5>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <p className="text-gray-700">
                      <strong>Price:</strong> GNF{product.price}
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
                  </Link>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 text-white p-2 mt-2 w-full rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
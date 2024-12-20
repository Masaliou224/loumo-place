"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/product";

interface CartItem extends Product {
  id: number;
  price: number;
  quantity: number;
  priceWithCommission: number;
  productName: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartQuantity: number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const commissionRate = 0.05;
    const priceWithCommission = product.price * (1 + commissionRate);


    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === product.id);
      if (item) {
        return prevItems.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item 
        );
      }
      return [...prevItems, { ...product, quantity: 1, priceWithCommission  }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) => 
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.priceWithCommission * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartQuantity, increaseQuantity, decreaseQuantity, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
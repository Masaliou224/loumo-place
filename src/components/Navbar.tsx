"use client";

import Link from "next/link"
import { useCart } from "./CartContext";

const Navbar = () => {

  const { cartQuantity } = useCart();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" passHref>
            <p className="text-2xl font-bold text-blue-600">Loumô</p>
          </Link>
          <button
            className="text-gray-500 focus:outline-none lg:hidden"
            type="button"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
          </button>

    

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link href="/productCard" passHref>
              <p className="text-gray-700 hover:text-blue-400">Home</p>
            </Link>
            <Link href="/login">
              <p className="text-gray-700 hover:text-blue-400">Login</p>
            </Link>
            <Link href="/cart" passHref>
              <p className="text-gray-700 hover:text-blue-400">🛒 Cart: {cartQuantity > 0 && `(${cartQuantity})`}</p>
            </Link>
            <Link href="/register" passHref>
              <p className="text-gray-700 hover:text-blue-400">Become a seller</p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
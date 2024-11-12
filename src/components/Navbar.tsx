"use client";

import Link from "next/link"
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = ({ searchQuery, setSearchQuery }) => {

  // const router = useRouter();

  const { cartQuantity } = useCart();

  // const handleLogout = () => {
  //   Cookies.remove("authToken");

  //   router.push("/login");
  // };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

            <input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-80 h-8 p-2 border border-gray-300 rounded-md"
            />
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
              <ul>
                <li>
                  <Link href="/personalSpace" passHref>
                    <p className="text-gray-700 hover:text-blue-400">Become a seller</p>
                  </Link>
                </li>
                <li>
                  {/* <Link href="/" onClick={handleLogout}>
                    <button onClick={handleLogout} className="text-gray-700 hover:text-blue-400">
                      Logout
                    </button> */}
                  {/* </Link> */}
                </li>
              </ul>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
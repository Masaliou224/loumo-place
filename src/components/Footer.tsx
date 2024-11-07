"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4">About</h3>
            <Link href="/sellers">
              <p className="text-gray-700 hover:text-blue-400 mb-2">Sellers</p>
            </Link>
            <Link href="/about">
              <p className="text-gray-700 hover:text-blue-400 mb-2">About Us</p>
            </Link>
          </div>

          {/* Companies Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4">Companies</h3>
            <Link href="/satina">
              <p className="text-gray-700 hover:text-blue-400 mb-2">Satina</p>
            </Link>
            <Link href="/hisense">
              <p className="text-gray-700 hover:text-blue-400 mb-2">Hisense</p>
            </Link>
            <Link href="/deals">
              <p className="text-gray-700 hover:text-blue-400 mb-2">Diallo & Frères</p>
            </Link>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4">Help</h3>
            <Link href="/sellers">
              <p className="text-gray-700 hover:text-blue-400 mb-2">Sellers</p>
            </Link>
            <Link href="/clients">
              <p className="text-gray-700 hover:text-blue-400 mb-2">Clients</p>
            </Link>
          </div>

          {/* Consumer Policy Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4">Consumer Policy</h3>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">© 2024 - Loumô.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
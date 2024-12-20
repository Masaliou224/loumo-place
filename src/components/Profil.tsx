"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const PersonalSpace = () => {
  // const [user, setUser] = useState<string | JwtPayload | null>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Get token from cookies
    const token = Cookies.get("authToken")

    if (!token) {
      router.push("/personalSpace");
      return;
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        throw new Error("Invalid token");
      }
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    router.push("login");
  }

  // if (!user) return null;

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-8">My personal space</h2>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-10">
          <Link href="/addProduct">
            <div className="flex flex-col items-center">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <p className="text-gray-700 mt-2">My ads</p>
            </div>
          </Link>

          <Link href="/">
            <div className="flex flex-col items-center">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 mt-2">My favorites</p>
            </div>
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-10"
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PersonalSpace;
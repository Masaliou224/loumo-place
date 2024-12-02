"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // Store token in a cookie
      Cookies.set("authToken", data.token, { expires: 1 });
      router.push('/personalSpace');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div>
          <input 
            type="email" 
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <Link
            href="/register"
          >Create account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
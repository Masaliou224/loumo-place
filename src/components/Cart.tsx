"use client";

import Image from "next/image";
import { useCart } from "./CartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const totalCart = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
        <div className="w-full max-w-4xl m-auto">

          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <>
              <table className="w-full table-auto">
                <caption className="caption-top text-left font-bold py-5">
                  Carts
                </caption>
                <thead>
                  <tr>
                    <th className="border border-slate-300 p-2"></th>
                    <th className="border border-slate-300 p-2">Image</th>
                    <th className="border border-slate-300 p-2">Title</th>
                    <th className="border border-slate-300 p-2">Price</th>
                    <th className="border border-slate-300 p-2">Quantity</th>
                    <th className="border border-slate-300 p-2">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-slate-300 p-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 w-10 text-center text-xl px-2 py-1 text-white ml-5"
                        >
                          X
                        </button>
                      </td>
                      <td className="border border-slate-300 p-2">
                        <Image src={item.image} alt={item.productName} width={80} height={80} />
                      </td>
                      <td className="border border-slate-300 p-2">{item.productName}</td>
                      <td className="border border-slate-300 p-2">{item.price}</td>
                      <td className="border border-slate-300">
                        <div className="flex flex-row gap-2 justify-center">
                          <span className="text-xl px-2 py-1 text-black font-bold cursor-pointer" onClick={() => decreaseQuantity(item.id)}>-</span>
                          <span>{item.quantity}</span>
                          <span className="text-xl px-2 py-1 text-black cursor-pointer" onClick={() => increaseQuantity(item.id)}>+</span>
                        </div>
                      </td>
                      <td className="border border-slate-300 p-2">GNF {(item.quantity * item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="w-full">
                <div className="w-full mt-4">
                  <h1 className="font-bold text-2xl">Total: GNF{totalCart}</h1>
                </div>
              </div>

              <button
                onClick={clearCart}
                className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      <Footer />
    </>
  );
};

export default Cart;
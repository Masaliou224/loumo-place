import HomePage from "@/components/HomePage";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

const page = () => {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
}

export default page;
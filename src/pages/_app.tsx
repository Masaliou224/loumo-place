import { CartProvider } from "@/components/CartContext";
import "../app/globals.css";

function MyApp({ Components, pageProps }) {
  return (
    <CartProvider>
      <Components {...pageProps}/>
    </CartProvider>
  );
}

export default MyApp;
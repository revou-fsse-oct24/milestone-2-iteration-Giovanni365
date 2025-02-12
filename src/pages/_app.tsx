import "@/styles/globals.css";
import Layout from "../component/layout";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
    </AuthProvider>
    
  );
}
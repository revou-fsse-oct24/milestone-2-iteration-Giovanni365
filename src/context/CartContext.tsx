import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextProps {
    cartItems: Product[];
    addToCart: (item: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }, [cartItems]);

      const addToCart = (item: Product) => {
        setCartItems((prevCart) => {
          const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
    
          if (existingItem) {
            return prevCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            );
          } else {
            return [...prevCart, item];
          }
        });
      };

      const removeFromCart = (id: number) => {
        setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
      };

      const updateQuantity = (id: number, quantity: number) => {
        setCartItems((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      };
      
      const clearCart = () => {
        setCartItems([]);
      };

      return (
        <CartContext.Provider
          value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
        >
          {children}
        </CartContext.Provider>
      );
    };

    export const useCart = () => {
        const context = useContext(CartContext);
        if (!context) {
          throw new Error("useCart must be used within a CartProvider");
        }
        return context;
      }
"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type CartContextType = {
  isCart: boolean;
  setIsCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCart, setIsCart] = useState(false);

  return (
    <CartContext.Provider value={{ isCart, setIsCart }}>
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
};

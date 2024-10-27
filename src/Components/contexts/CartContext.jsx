import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Check if there's a cartId in localStorage
  const [cartId, setCartId] = useState(localStorage.getItem("cartId") || null);

  // Save cartId to localStorage whenever it changes
  useEffect(() => {
    if (cartId) {
      localStorage.setItem("cartId", cartId);
    } else {
      localStorage.removeItem("cartId");
    }
  }, [cartId]);

  return (
    <CartContext.Provider value={{ cartId, setCartId }}>
      {children}
    </CartContext.Provider>
  );
};

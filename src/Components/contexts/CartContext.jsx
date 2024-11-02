import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Check if there's a cartId in localStorage
  const [cartId, setCartId] = useState(localStorage.getItem("cartId") || null);
  const [mappedItem, setMappedItem] = useState([]);
  const [invisible, setInvisible] = useState(true);

  // Save cartId to localStorage whenever it changes
  useEffect(() => {
    if (cartId) {
      localStorage.setItem("cartId", cartId);
    } else {
      localStorage.removeItem("cartId");
    }
  }, [cartId]);

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>> diplay red dot", invisible);

    if (mappedItem.length > 0) setInvisible(false);
  }, [mappedItem]);

  return (
    <CartContext.Provider
      value={{
        cartId,
        setCartId,
        mappedItem,
        setMappedItem,
        invisible,
        setInvisible,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

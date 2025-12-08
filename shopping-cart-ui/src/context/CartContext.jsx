import { useState, createContext, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    return <CartContext.Provider value={{ cart }} >{children}</CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext);
}

import { useState, useEffect, createContext, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : []
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart]);

    function addToCart(product) {
        setCart((current) => {
            const existing = current.find((item) => item.id === product.id);

            if(existing) {
                return current.map((item) => item.id === product.id ? {
                    ...item,
                    quantity: item.quantity + 1
                } : item);
            } else {
                return [...current, {
                    ...product,
                    quantity: 1
                }];
            }
        });
    }

    function removeFromCart(id) {
        setCart((current) => current.filter((item) => item.id !== id));
    }

    function clearCart() {
        setCart([]);
    }

    return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }} >{children}</CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext);
}

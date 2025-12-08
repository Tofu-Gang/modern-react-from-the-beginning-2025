import { useState, useEffect, createContext, useContext } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products!");
                } else {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);
    
    return <ProductContext.Provider value={{ products, loading, error }} >{children}</ProductContext.Provider>
}

export function useProducts() {
    return useContext(ProductContext);
}

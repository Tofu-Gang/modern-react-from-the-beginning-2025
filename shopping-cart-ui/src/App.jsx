import { useState, useEffect } from "react";
import ProductList from "./components/ProductList.jsx";

function App() {
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

    return <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">🛒Product Catalog</h1>
        {loading && <p>Loading...</p>}
        {error && <div className="error">❌{error}</div>}
        {!loading && !error && <ProductList products={products} />}
    </div>;
}

export default App

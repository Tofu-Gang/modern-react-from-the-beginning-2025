import { useState, useEffect } from "react";
import CoinCard from "./CoinCard.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function CryptoDash() {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCoins() {
            try {
                const params = "vs_currency=czk&order=market_cap_desc&per_page=10&page=1&sparkline=false";
                const response = await fetch(`${API_URL}?${params}`);

                if(!response.ok) {
                    throw new Error("Failed to fetch data");
                } else {
                    const data = await response.json();
                    console.log(data);
                    setCoins(data);
                }
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCoins();
    }, []);

    return (
        <div>
            <h1>🚀Crypto Dash</h1>
            {isLoading && <p>Loading...</p>}
            {error && <div className="error">{error}</div>}
            {!isLoading && !error && (
                <main className="grid">
                    {coins.map((coin) => (
                        <CoinCard key={coin.id} coin={coin} />
                    ))}
                </main>
            )}
        </div>
    );
}

export default CryptoDash;

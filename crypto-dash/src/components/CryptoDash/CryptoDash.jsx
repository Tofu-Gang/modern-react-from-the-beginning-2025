import { useState, useEffect } from "react";
import CoinCard from "./CoinCard.jsx";
import LimitSelector from "./LimitSelector.jsx";
import FilterInput from "./FilterInput.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function CryptoDash() {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        async function fetchCoins() {
            try {
                const params = `vs_currency=czk&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;
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
    }, [limit]);

    const filteredCoins = coins.filter((coin) => {
        return coin.name.toLowerCase().includes(filter.toLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLowerCase());
    })

    return (
        <div>
            <h1>🚀Crypto Dash</h1>
            {isLoading && <p>Loading...</p>}
            {error && <div className="error">{error}</div>}

            <div className="top-controls">
                <FilterInput filter={filter} setFilter={setFilter} />
                <LimitSelector limit={limit} setLimit={setLimit} />
            </div>

            {!isLoading && !error && (
                <main className="grid">
                    {filteredCoins.length > 0 ? filteredCoins.map((coin) => (
                        <CoinCard key={coin.id} coin={coin} />
                    )) : <p>No matching coins</p>}
                </main>
            )}
        </div>
    );
}

export default CryptoDash;

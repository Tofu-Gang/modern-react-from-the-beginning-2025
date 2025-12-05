import { useState, useEffect } from "react";
import CoinCard from "./CoinCard.jsx";
import LimitSelector from "./LimitSelector.jsx";
import FilterInput from "./FilterInput.jsx";
import OrderBySelector from "./OrderBySelector.jsx";

const API_URL = import.meta.env.VITE_COINS_API_URL;
const ORDER_BY_OPTIONS = [{
    id: self.crypto.randomUUID(),
    label: "Market Cap (High To Low)",
    value: "market_cap_desc",
    key: "market_cap",
    isAsc: false
}, {
    id: self.crypto.randomUUID(),
    label: "Market Cap (Low To High)",
    value: "market_cap_asc",
    key: "market_cap",
    isAsc: true
}, {
    id: self.crypto.randomUUID(),
    label: "Price (High To Low)",
    value: "price_desc",
    key: "current_price",
    isAsc: false
}, {
    id: self.crypto.randomUUID(),
    label: "Price (Low To High)",
    value: "price_asc",
    key: "current_price",
    isAsc: true
}, {
    id: self.crypto.randomUUID(),
    label: "24h Change (High To Low)",
    value: "change_desc",
    key: "price_change_percentage_24h",
    isAsc: false
}, {
    id: self.crypto.randomUUID(),
    label: "24h Change (Low To High)",
    value: "change_asc",
    key: "price_change_percentage_24h",
    isAsc: true
}];

function CryptoDash() {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState("");
    // https://docs.coingecko.com/reference/coins-markets#parameter-order
    // default is the first one
    const [orderBy, setOrderBy] = useState(ORDER_BY_OPTIONS[0]);

    useEffect(() => {
        async function fetchCoins() {
            try {
                const params = `vs_currency=czk&order=${ORDER_BY_OPTIONS[0].value}&per_page=${limit}&page=1&sparkline=false`;
                const response = await fetch(`${API_URL}?${params}`);

                if(!response.ok) {
                    throw new Error("Failed to fetch data");
                } else {
                    const data = await response.json();
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
    }).slice().sort((a, b) => orderBy.isAsc ? a[orderBy.key] - b[orderBy.key] : b[orderBy.key] - a[orderBy.key]);

    return (
        <div>
            <h1>🚀Crypto Dash</h1>
            {isLoading && <p>Loading...</p>}
            {error && <div className="error">{error}</div>}

            <div className="top-controls">
                <FilterInput filter={filter} setFilter={setFilter} />
                <LimitSelector limit={limit} setLimit={setLimit} />
                <OrderBySelector orderBy={orderBy} setOrderBy={setOrderBy} orderByOptions={ORDER_BY_OPTIONS} />
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

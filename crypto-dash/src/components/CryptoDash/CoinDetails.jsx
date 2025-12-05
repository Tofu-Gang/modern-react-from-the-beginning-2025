import { useState, useEffect} from "react";
import {Link, useParams} from "react-router";
import Spinner from "./Spinner.jsx";
import CoinChart from "./CoinChart.jsx";

const API_URL = import.meta.env.VITE_COIN_API_URL;

function CoinDetails() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCoin() {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if(!response.ok) {
                    throw new Error("Failed to fetch data");
                } else {
                    const data = await response.json();
                    setCoin(data);
                }
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCoin();
    }, [id])

    return (
        <div className="coin-details-container">
            <Link to="/">⬅️ Go Back Home</Link>
            <h1 className="coin-details-title">{coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}</h1>
            { loading && <Spinner />}
            { error && <div className="error">❌ {error}</div> }
            { !loading && !error && (
                <>
                    <img src={coin.image.large} alt={coin.name} className="coin-details-image" />
                    <p>{`${coin.description.en.split(". ")[0]}.`}</p>
                    <div className="coin-details-info">
                        <h3>#{coin.market_cap_rank}</h3>
                        <h3>Current Price: {coin.market_data.current_price.czk.toLocaleString("cs", { style: "currency", currency: "CZK"})}</h3>
                        <h4>Market Cap: {coin.market_data.market_cap.czk.toLocaleString("cs", { style: "currency", currency: "CZK"})}</h4>
                        <h4>24h High: {coin.market_data.high_24h.czk.toLocaleString("cs", { style: "currency", currency: "CZK"})}</h4>
                        <h4>24h Low: {coin.market_data.low_24h.czk.toLocaleString("cs", { style: "currency", currency: "CZK"})}</h4>
                        <h4>24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)} ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)</h4>
                        <h4>Circulating Supply: {coin.market_data.circulating_supply.toLocaleString("cs")}</h4>
                        <h4>Total Supply: {coin.market_data?.total_supply.toLocaleString("cs") || "N/A"}</h4>
                        <h4>All-Time High: {coin.market_data.ath.czk.toLocaleString("cs", { style: "currency", currency: "CZK"})} on {new Date(coin.market_data.ath_date.czk).toLocaleDateString("cs")}</h4>
                        <h4>All-Time Low: {coin.market_data.atl.czk.toLocaleString("cs", { style: "currency", currency: "CZK"})} on {new Date(coin.market_data.atl_date.czk).toLocaleDateString("cs")}</h4>
                        <h4>Last Updated: { new Date(coin.last_updated).toLocaleDateString("cs")}</h4>
                    </div>
                    <CoinChart coinId={coin.id}/>
                    <div className="coin-details-links">
                        {coin.links.homepage[0] && (
                            <p>🌐 <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferer">Website</a></p>)}
                        {coin.links.blockchain_site[0] && (
                            <p>🧩 <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferer">Blockchain Explorer</a></p>
                        )}
                        {coin.categories.length > 0 && (
                            <p>Categories: {coin.categories.join(", ")}</p>
                        )}
                        {!loading && !error && !coin && <p>No Data Found!</p>}
                    </div>
                </>
            )}
        </div>
    );
}

export default CoinDetails;

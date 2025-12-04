import { useState, useEffect } from "react";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

function CryptoDash() {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Failed to fetch data");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
                setCoins(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>🚀Crypto Dash</h1>
        </div>
    );
}

export default CryptoDash;

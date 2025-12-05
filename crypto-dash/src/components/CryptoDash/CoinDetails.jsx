import { useState, useEffect} from "react";
import { useParams } from "react-router";

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
                    console.log(data);
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
        <div>Coin Details {id}</div>
    );
}

export default CoinDetails;

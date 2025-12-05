import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
} from "chart.js";
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;
const CURRENCY = "czk";

function CoinChart({ coinId }) {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPrices() {
            const response = await fetch(`${API_URL}/${coinId}/market_chart?vs_currency=${CURRENCY}&days=7`);
            const data = await response.json();
            const prices = data.prices.map((price) => ({
                // timestamp
                x: price[0],
                // the actual price
                y: price[1]
            }));
            setChartData({
                datasets: [
                    {
                        label: `Price (${CURRENCY.toUpperCase()})`,
                        data: prices,
                        fill: true,
                        borderColor: "#007bff",
                        backgroundColor: "rgba(0, 123, 255, 0.1)",
                        pointRadius: 0,
                        tension: 0.3
                    },
                ],
            });
            setLoading(false);
        }
        fetchPrices();
    }, [coinId]);

    return (
        <>
            Chart
        </>
    );
}

export default CoinChart;

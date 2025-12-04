function CoinCard({ coin }) {
    const { image, name, symbol, current_price, price_change_percentage_24h, market_cap } = coin;
    return (
        <div className="coin-card">
            <div className="coin-header">
                <img src={image} alt={name} className="coin-image" />
                <div>
                    <h2>{name}</h2>
                    <p className="symbol">{symbol.toUpperCase()}</p>
                </div>
            </div>
            <p>Price: {current_price.toLocaleString("cs", { style: "currency", currency: "CZK"})}</p>
            <p className={price_change_percentage_24h >= 0 ? "positive" : "negative"}>
                {price_change_percentage_24h.toFixed(2)} %
            </p>
            <p>
                Market Cap: {market_cap.toLocaleString("cs", { style: "currency", currency: "CZK"})}
            </p>
        </div>
    );
}

export default CoinCard;

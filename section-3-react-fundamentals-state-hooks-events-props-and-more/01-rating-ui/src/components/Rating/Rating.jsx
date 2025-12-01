import { useState } from "react";

function Rating(
    {
        heading="Rate Your Experience",
        color="gold",
        feedbackMessages=["Terrible", "Poor", "Fair", "Good", "Excellent"]
    }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const stars = Array.from({length: 5}, (_, index) => index + 1);

    return(
        <div className="rating-container">
            <h2>{heading}</h2>
            <div className="stars">
                {stars.map((star) => (
                    <span
                        key={star}
                        className="star"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        style={{
                            color: star <= (hover || rating) ? color : "#ccc"
                        }}
                    >{"\u2605"}
                    </span>)
                )}
            </div>
            { rating > 0 && <p className="feedback">{ feedbackMessages[rating - 1]}</p>}
        </div>
    );
}

export default Rating;

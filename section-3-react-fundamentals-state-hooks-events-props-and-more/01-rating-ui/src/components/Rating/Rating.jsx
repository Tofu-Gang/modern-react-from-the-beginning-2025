import { useState } from "react";

function Rating() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const stars = Array.from({length: 5}, (_, index) => index + 1);
    const feedbackMessages = ["Terrible", "Poor", "Fair", "Good", "Excellent"];

    return(
        <div className="rating-container">
            <h2>Rate Your Experience!</h2>
            <div className="stars">
                {stars.map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= (hover || rating) ? "active" : ""}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >{"\u2605"}
                    </span>)
                )}
            </div>
            { rating > 0 && <p className="feedback">{ feedbackMessages[rating - 1]}</p>}
        </div>
    );
}

export default Rating;

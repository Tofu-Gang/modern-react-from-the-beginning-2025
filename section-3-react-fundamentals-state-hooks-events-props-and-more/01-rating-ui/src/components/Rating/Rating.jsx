import { useState } from "react";
import Star from "./Star.jsx";

function Rating(
    {
        heading="Rate Your Experience",
        color="gold",
        feedbackMessages=["Terrible", "Poor", "Fair", "Good", "Excellent"]
    }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const stars = Array.from({length: feedbackMessages.length}, (_, index) => index + 1);

    function setHoverEnter(star) {
        setHover(star)
    }

    function setHoverLeave() {
        setHover(0);
    }

    function getStarColor(star) {
        return star <= (hover || rating) ? color : "#ccc";
    }

    return(
        <div className="rating-container">
            <h2>{heading}</h2>
            <div className="stars">
                {stars.map((star) => (
                    <Star
                        key={star}
                        color={getStarColor(star)}
                        setRating={() => setRating(star)}
                        setHoverEnter={() => setHoverEnter(star)}
                        setHoverLeave={setHoverLeave} />
                    )
                )}
            </div>
            { rating > 0 && <p className="feedback">{ feedbackMessages[rating - 1]}</p>}
        </div>
    );
}

export default Rating;

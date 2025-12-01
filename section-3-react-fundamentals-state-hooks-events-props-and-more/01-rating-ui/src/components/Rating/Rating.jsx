import { useState } from "react";

function Rating() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const stars = Array.from({length: 5}, (_, index) => index + 1);

    return(
        <div className="rating-container">
            <h2>Rate Your Experience!</h2>
            <div className="stars">
                {stars.map((star) => (
                    <span
                        key={star}
                        className="star"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >{"\u2605"}
                    </span>)
                )}
            </div>
        </div>
    );
}

export default Rating;

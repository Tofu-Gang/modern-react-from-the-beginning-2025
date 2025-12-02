import { useState } from "react";
import Star from "./Star.jsx";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

function Rating(
    {
        heading="Rate Your Experience",
        color="gold",
        feedbackMessages=["Terrible", "Poor", "Fair", "Good", "Excellent"]
    }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false);
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

    function handleSubmit() {
        if(rating > 0) {
            setSubmitted(true);
        }
    }

    function closeModal() {
        setSubmitted(false);
        setRating(0);
        setHover(0);
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
            <Button className="submit-btn" onClick={handleSubmit} disabled={rating === 0}>Submit</Button>
            {submitted && <Modal
                message="Thank You"
                info={`You rated us ${rating} star${rating > 1 ? "s" : ""}`}
                closeModal={closeModal}
            />}
        </div>
    );
}

export default Rating;

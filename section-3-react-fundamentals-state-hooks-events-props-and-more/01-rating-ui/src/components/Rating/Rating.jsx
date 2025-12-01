function Rating() {
    const stars = Array.from({length: 5}, (_, index) => index + 1);

    return(
        <div className="rating-container">
            <h2>Rate Your Experience!</h2>
            <div className="stars">
                {stars.map((star) => (<span key={star} className="star">{"\u2605"}</span>))}
            </div>
        </div>);
}

export default Rating;

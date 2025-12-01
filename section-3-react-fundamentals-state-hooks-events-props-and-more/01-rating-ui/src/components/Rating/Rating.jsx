function Rating() {
    const stars = Array.from({length: 5}, (_, index) => index + 1);

    function clicked(index) {
        console.log("CLICKED!!!", index);
    }

    function hovered(direction, index) {
        console.log(direction, index);
    }

    return(
        <div className="rating-container">
            <h2>Rate Your Experience!</h2>
            <div className="stars">
                {stars.map((star, index) => (
                    <span
                        key={star}
                        className="star"
                        onClick={() => clicked(index)}
                        onMouseEnter={() => hovered("enter", index)}
                        onMouseLeave={() => hovered("leave", index)}
                    >{"\u2605"}
                    </span>)
                )}
            </div>
        </div>);
}

export default Rating;

function Star({color, setRating, setHoverEnter, setHoverLeave}) {
    return (
        <span
            className="star"
            onClick={setRating}
            onMouseEnter={setHoverEnter}
            onMouseLeave={setHoverLeave}
            style={{color: color}}
        >{"\u2605"}
        </span>
    );
}

export default Star;

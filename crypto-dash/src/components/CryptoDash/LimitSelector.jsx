function LimitSelector({ limit, setLimit }) {
    return (
        <>
            <label htmlFor="limit">Show: </label>
            <select
                id="limit"
                value={limit}
                onChange={(event) => setLimit(Number(event.target.value))}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </>
    );
}

export default LimitSelector;

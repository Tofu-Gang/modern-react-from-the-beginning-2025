function FilterInput({ filter, setFilter }) {
    return (
        <div className="filter">
            <input
                type="text"
                value={filter}
                placeholder="Filter coins by name or symbol"
                onChange={(event) => setFilter(event.target.value)}
            />
        </div>
    );
}

export default FilterInput;

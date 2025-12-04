function OrderBySelector({ orderBy, setOrderBy, orderByOptions }) {
    return (
        <div className="controls">
            <label htmlFor="orderBy">Order By:</label>
            <select
                id="orderBy"
                value={JSON.stringify(orderBy)}
                onChange={(event) => setOrderBy(JSON.parse(event.target.value))}
            >
                {orderByOptions.map((option) => <option
                    key={option.id}
                    value={JSON.stringify(option)}
                >{option.label}</option>)}
            </select>
        </div>
    );
}

export default OrderBySelector;

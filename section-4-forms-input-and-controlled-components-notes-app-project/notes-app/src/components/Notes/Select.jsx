function Select({ name, labelText, value, onChange, options, required=false }) {
    const id = `select-${labelText.toLowerCase()}`;

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block font-semibold">{labelText}</label>
            <select
                name={name}
                id={id}
                className="w-full p-2 border rounded-lg"
                value={value}
                onChange={onChange}
                required={required}
            >
                {options.map((option) => <option key={self.crypto.randomUUID()} value={option.value}>{option.label}</option>)}
            </select>
        </div>
    );
}

export default Select;

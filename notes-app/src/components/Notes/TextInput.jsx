function TextInput({ name, labelText, value, onChange, required=false }) {
    const id = `text-input-${labelText.toLowerCase()}`;

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block font-semibold">{labelText}</label>
            <input
                name={name}
                id={id}
                type="text"
                className="w-full p-2 border rounded-lg"
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}

export default TextInput;

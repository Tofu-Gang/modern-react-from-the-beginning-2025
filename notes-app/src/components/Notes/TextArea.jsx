function TextArea({name, labelText, value, onChange, required = false}) {
    const id = `text-area-${labelText.toLowerCase()}`;
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block font-semibold">{labelText}</label>
            <textarea
                name={name}
                id={id}
                className="w-full p-2 border rounded-lg"
                value={value}
                onChange={onChange}
                required={required}
            ></textarea>
        </div>
    );
}

export default TextArea;

function Note({ title, priority, category, description, color, deleteNote}) {
    return (
        <div
            className={`p-4 bg-white rounded-lg shadow-md border-l-4 border-${color}`}
        >
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-600">
                <strong>Priority: </strong> {priority}
            </p>
            <p className="text-sm text-gray-600">
                <strong>Category: </strong> {category}
            </p>
            <p className="m-2">{description}</p>
            <button
                className="mt-3 text-red-500 cursor-pointer transition hover:text-red-700"
                onClick={deleteNote}
            >🗑️Delete</button>
        </div>
    );
}

export default Note;

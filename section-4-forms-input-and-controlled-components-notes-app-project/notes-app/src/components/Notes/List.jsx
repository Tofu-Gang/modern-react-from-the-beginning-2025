import Note from "./Note.jsx";

function List({ notes, deleteNote, priorities }) {
    function getColor(value) {
        return priorities.filter((priority) => priority.value === value)[0].color
    }

    if(notes.length === 0) {
        return <p className="text-center text-gray-500">No Notes Yet</p>;
    } else {
        return (
            <div className="space-y-4">
                {notes.map((note) => (
                    <Note key={note.id} {...note} color={getColor(note.priority)} deleteNote={() => deleteNote(note.id)} />
                ))}
            </div>
        );
    }
}

export default List;

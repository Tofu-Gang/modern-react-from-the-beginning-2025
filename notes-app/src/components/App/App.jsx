import { useState } from "react";
import Data from "../Notes/data.js";
import Form from "../Notes/Form.jsx";
import List from "../Notes/List.jsx";

function App() {
    const [notes, setNotes] = useState([]);

    function deleteNote(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");

        if(confirmDelete) {
            setNotes((current) => current.filter((note) => note.id !== id));
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">📝Notes App</h2>
            <Form data={Data} setNotes={setNotes} />
            <List notes={notes} deleteNote={deleteNote} priorities={Data.priorities} />
        </div>
    );
}

export default App;

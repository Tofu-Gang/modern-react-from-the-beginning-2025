import { useState } from "react";
import Data from "../Note/data.js";
import Form from "../Note/Form.jsx";
import List from "../Note/List.jsx";

function App() {
    const [notes, setNotes] = useState([]);

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">📝Notes App</h2>
            <Form data={Data} setNotes={setNotes} />
            <List notes={notes} />
        </div>
    );
}

export default App;

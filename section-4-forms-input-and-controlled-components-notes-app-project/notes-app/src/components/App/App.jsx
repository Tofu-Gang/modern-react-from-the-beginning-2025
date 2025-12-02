import Form from "../Note/Form.jsx";
import Data from "../Note/data.js";

function App() {

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">📝Notes App</h2>
            <Form data={Data}/>
        </div>
    );
}

export default App;

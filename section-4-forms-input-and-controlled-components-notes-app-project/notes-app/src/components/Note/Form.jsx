import { useState } from "react";
import TextInput from "./TextInput.jsx";
import Select from "./Select.jsx";
import TextArea from "./TextArea.jsx";

function Form({ data }) {
    const [formData, setFormData] = useState({
        title: "",
        priority: data.priorities.filter((priority) => priority.default)[0].value,
        category: data.categories.filter((category) => category.default)[0].value,
        description: ""
    });

    function handleChange(event) {
        setFormData((current) => ({ ...current, [event.target.name]: event.target.value}));
    }

    return (
        <form className="mb-6 ">
            <TextInput
                name="title"
                labelText="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <Select
                name="priority"
                labelText="Priority"
                value={formData.priority}
                onChange={handleChange}
                options={data.priorities}
                required
            />
            <Select
                name="category"
                labelText="Category"
                value={formData.category}
                onChange={handleChange}
                options={data.categories}
                required
            />
            <TextArea
                name="description"
                labelText="Description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <button
                className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-600"
            >Add Note</button>
        </form>
    );
}

export default Form;

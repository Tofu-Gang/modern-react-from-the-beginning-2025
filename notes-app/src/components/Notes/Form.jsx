import {useState} from "react";
import TextInput from "./TextInput.jsx";
import Select from "./Select.jsx";
import TextArea from "./TextArea.jsx";

function Form({data, setNotes}) {
    const defaultFormData = {
        title: "",
        priority: data.priorities.filter((priority) => priority.default)[0].value,
        category: data.categories.filter((category) => category.default)[0].value,
        description: ""
    };
    const [formData, setFormData] = useState(defaultFormData);
    const [isFormVisible, setFormVisible] = useState(false);

    function resetFormData() {
        setFormData(defaultFormData);
    }

    function handleChange(event) {
        setFormData((current) => ({...current, [event.target.name]: event.target.value}));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!formData.title || !formData.priority || !formData.category || !formData.description) {
            // form data are not valid
            return;
        } else {
            setNotes((current) => ([
                ...current, {
                    id: self.crypto.randomUUID(),
                    ...formData
                }]));
            resetFormData();
        }
    }

    return (
        <>
            <button className=
                        "w-full
                        bg-gray-100
                        border
                        border-gray-300
                        text-purple-800
                        py-2
                        rounded-lg
                        cursor-pointer
                        hover:bg-purple-200
                        hover:border-purple-300
                        transition
                        mb-4"
                    onClick={() => setFormVisible((current) => !current)}
            >
                {isFormVisible ? "Hide Form ✖️" : "Add New Notes ➕"}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="mb-6 ">
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
                        type="submit"
                    >Add Note
                    </button>
                </form>
            )}
        </>
    );
}

export default Form;

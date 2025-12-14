type FormInputProps = {
    label: string,
    inputType: string,
    id: string
}

function FormInput({ label, inputType, id }:FormInputProps) {
    let formInput;

    if (inputType === "text" || inputType === "email") {
        formInput = (
            <div>
                <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}</label>
                <input
                    type={inputType}
                    id={id}
                    name={id}
                    className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
                />
            </div>
        );
    } else if (inputType === "textarea") {
        formInput = (
            <div>
                <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}</label>
                <textarea
                    id={id}
                    name={id}
                    className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
                />
            </div>
        );
    } else {
        formInput = <></>;
    }

    return formInput;
}

export default FormInput;

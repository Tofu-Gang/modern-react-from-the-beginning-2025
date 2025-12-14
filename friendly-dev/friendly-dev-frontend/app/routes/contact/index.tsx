import type { Route } from "./+types/index";
import FormInput from "../../components/FormInput";

type inputTemplate = {
    label: string,
    inputType: string,
    id: string,
    errorMessage: string,
    regex?: RegExp,
    regexErrorMessage?: string
};

type validation = {
    id: string,
    errorMessage: string,
    regex?: RegExp,
    regexErrorMessage?: string
};

type data = {
    [key:string]: string
};

type errors = {
    [key:string]: string
};

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | Contact"},
        {name: "description", content: "Custom Website Development"},
    ];
}

const FORM_TEMPLATE:inputTemplate[] = [
    {
        label: "Full Name",
        inputType: "text",
        id: "name",
        errorMessage: "Name is required"
    },
    {
        label: "Email",
        inputType: "email",
        id: "email",
        errorMessage: "Email is required",
        regex: (/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        regexErrorMessage: "Invalid email format"
    },
    {
        label: "Subject",
        inputType: "text",
        id: "subject",
        errorMessage: "Subject is required"
    },
    {
        label: "Message",
        inputType: "textarea",
        id: "message",
        errorMessage: "Message is required"
    }
];

function ContactPage({ actionData }:Route.ComponentProps) {
    return (
        <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">📬Contact Me</h2>
            <form action="https://formspree.io/f/mqarjgar" method="POST" className="space-y-6">
                {FORM_TEMPLATE.map((input_template) => (
                    <FormInput key={input_template.id} label={input_template.label} inputType={input_template.inputType} id={input_template.id} />
                ))}
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default ContactPage;

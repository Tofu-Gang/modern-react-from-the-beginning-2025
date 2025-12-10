import type { Route } from "./+types/index";
import { Form } from "react-router";
import FormInput from "../../components/FormInput";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | Contact"},
        {name: "description", content: "Custom Website Development"},
    ];
}

const FORM_TEMPLATE = [
    {
        label: "Full Name",
        inputType: "text",
        id: "name"
    },
    {
        label: "Email",
        inputType: "email",
        id: "email"
    },
    {
        label: "Subject",
        inputType: "text",
        id: "subject"
    },
    {
        label: "Message",
        inputType: "textarea",
        id: "message"
    }
];

export async function action({ request }:Route.ActionArgs) {
    const formData = await request.formData();
    const ids = FORM_TEMPLATE.map((input_template) => input_template.id);
    const data = ids.reduce((accumulator, id) => ({ ...accumulator, [id]: formData.get(id)}), {})
    return { message: "Form submitted successfully!", data };
}

function ContactPage({ actionData }:Route.ComponentProps) {
    return (
        <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">📬Contact Me</h2>
            {actionData?.message ? (
                <p className="mb-6 p-4 bg-green-600 text-green-100 text-center rounded-lg border border-green-500 shadow-md">{actionData.message}</p>
            ) : null}
            <Form method="POST" className="space-y-6">
                {FORM_TEMPLATE.map((data) => (
                    <FormInput key={data.id} label={data.label} inputType={data.inputType} id={data.id} />
                ))}
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                    Send Message
                </button>
            </Form>
        </div>
    );
}

export default ContactPage;

import type {Route} from "../../../.react-router/types/app/routes/home/+types";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | Contact"},
        {name: "description", content: "Custom Website Development"},
    ];
}

function ContactPage() {
    return <h2 className="text-3xl font-bold text-white mb-8 text-center">📬Contact Me</h2>;
}

export default ContactPage;

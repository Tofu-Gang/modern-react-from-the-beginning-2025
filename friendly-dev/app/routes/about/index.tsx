import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | About"},
        {name: "description", content: "Custom Website Development"},
    ];
}

function AboutPage() {
    return <h2 className="text-3xl font-bold text-white mb-2">Hey, this is Tofu Gang SW!👋</h2>;
}

export default AboutPage;

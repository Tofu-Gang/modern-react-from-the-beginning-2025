import type {Route} from "../../../.react-router/types/app/routes/home/+types";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | Projects"},
        {name: "description", content: "Custom Website Development"},
    ];
}

function ProjectsPage() {
    return (
        <section>
            <h2 className="text-3xl text-white font-bold mb-8">🚀Projects</h2>
        </section>
    );
}

export default ProjectsPage;

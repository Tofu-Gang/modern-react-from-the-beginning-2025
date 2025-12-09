import type { Route } from "./+types/index";

export async function loader({ request }:Route.LoaderArgs):Promise<any> {
    const response = await fetch("http://localhost:8000/projects");
    const data = await response.json();
    return { projects: data };
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | Projects"},
        {name: "description", content: "Custom Website Development"},
    ];
}

function ProjectsPage({ loaderData }: Route.ComponentProps) {
    const { projects } = loaderData;
    console.log("PRDEL!!!", projects);
    return <h2 className="text-3xl font-bold text-white mb-8">🚀Projects</h2>;
}

export default ProjectsPage;

import type { Route } from "./+types/details";
import type { Project } from "~/types";

export async function clientLoader({ request, params }:Route.ClientLoaderArgs):Promise<Project> {
    const response = await fetch(`http://localhost:8000/projects/${params.id}`);
    if (!response.ok) {
        throw new Response("Project not found!", { status: 404 });
    } else {
        return await response.json();
    }
}

export function HydrateFallback() {
    return <div>Loading...</div>
}

function ProjectDetailsPage({ loaderData }:Route.ComponentProps) {
    const project = loaderData;
    return (
        <>Project Details</>
    );
}

export default ProjectDetailsPage;

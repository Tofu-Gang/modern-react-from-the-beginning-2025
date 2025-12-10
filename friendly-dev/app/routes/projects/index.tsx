import { useState } from "react";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import ProjectCard from "../../components/ProjectCard";
import Pagination from "../../components/Pagination";

// server loader
export async function loader({ request }:Route.LoaderArgs):Promise<{ projects: Project[] }> {
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
    const { projects } = loaderData as { projects: Project[] };
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    // Get current page projects
    const indexOfLast = currentPage * projectsPerPage;
    const indexOfFirst = indexOfLast - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirst, indexOfLast);

    return(
        <>
            <h2 className="text-3xl font-bold text-white mb-8">🚀Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2">
                {currentProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </>
    );
}

export default ProjectsPage;

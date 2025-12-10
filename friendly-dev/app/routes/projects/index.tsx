import { useState } from "react";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import ProjectCard from "../../components/ProjectCard";

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
    const projectsPerPage = 2;
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    // Get current page projects
    const indexOfLast = currentPage * projectsPerPage;
    const indexOfFirst = indexOfLast - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirst, indexOfLast);

    function renderPagination() {
        return (
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 cursor-pointer"}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        );
    }

    return(
        <>
            <h2 className="text-3xl font-bold text-white mb-8">🚀Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2">
                {currentProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            {totalPages > 1 && renderPagination()}
        </>
    );
}

export default ProjectsPage;

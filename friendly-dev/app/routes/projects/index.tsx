import { useState } from "react";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import ProjectCard from "../../components/ProjectCard";
import Pagination from "../../components/Pagination";
import Categories from "../../components/Categories";
import { AnimatePresence, motion } from "framer-motion";

// server loader
export async function loader({ request }:Route.LoaderArgs):Promise<{ projects: Project[] }> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
    const data = await response.json();
    return { projects: data };
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | Projects"},
        {name: "description", content: "Custom Website Development"},
    ];
}

const DEFAULT_CATEGORY = "All";

function ProjectsPage({ loaderData }: Route.ComponentProps) {
    const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
    const [currentPage, setCurrentPage] = useState(1);
    const { projects } = loaderData as { projects: Project[] };

    const categories = [DEFAULT_CATEGORY, ...new Set(projects.map((project) => project.category))];
    const filteredProjects = selectedCategory === DEFAULT_CATEGORY ? projects : projects.filter((project) => project.category === selectedCategory);

    const projectsPerPage = 10;
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    // Get current page projects
    const indexOfLast = currentPage * projectsPerPage;
    const indexOfFirst = indexOfLast - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

    return(
        <>
            <h2 className="text-3xl font-bold text-white mb-8">🚀Projects</h2>
            <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setCurrentPage={setCurrentPage} />
            <AnimatePresence mode="wait">
                <motion.div layout className="grid gap-6 sm:grid-cols-2">
                    {currentProjects.map((project) => (
                        <motion.div key={project.id} layout>
                            <ProjectCard key={project.id} project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </>
    );
}

export default ProjectsPage;

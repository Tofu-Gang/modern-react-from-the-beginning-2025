import type { Route } from "./+types/index";
import type { Project } from "~/types";
import FeaturedProjects from "../../components/FeaturedProjects";
import AboutPreview from "../../components/AboutPreview";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | Welcome"},
        {name: "description", content: "Custom Website Development"},
    ];
}

export async function loader({ request }:Route.LoaderArgs):Promise<{ projects:Project[] }> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
    const data = await response.json();
    return { projects: data };
}

function HomePage({ loaderData }:Route.ComponentProps) {
    const { projects } = loaderData;
    return (
        <>
            <FeaturedProjects projects={projects} count={2} />
            <AboutPreview />
        </>
    );
}

export default HomePage;

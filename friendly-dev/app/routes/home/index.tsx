import type { Route } from "./+types/index";
import type { Project, PostMeta } from "~/types";
import FeaturedProjects from "../../components/FeaturedProjects";
import AboutPreview from "../../components/AboutPreview";
import LatestPosts from "../../components/LatestPosts";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | Welcome"},
        {name: "description", content: "Custom Website Development"},
    ];
}

export async function loader({ request }:Route.LoaderArgs):Promise<{ projects:Project[], posts: PostMeta[] }> {
    const url = new URL(request.url);
    const [projectsResponse, postsResponse] = await Promise.all([fetch(
        `${import.meta.env.VITE_API_URL}/projects`),
        fetch(new URL("/posts-meta.json", url))
    ]);

    if (!projectsResponse.ok || !postsResponse.ok) {
        throw new Error("Failed to fetch projects or posts");
    } else {
        const [projects, posts] = await Promise.all([
            projectsResponse.json(),
            postsResponse.json()
        ]);
        return { projects, posts };
    }
}

function HomePage({ loaderData }:Route.ComponentProps) {
    const { projects, posts } = loaderData;
    return (
        <>
            <FeaturedProjects projects={projects} count={2} />
            <AboutPreview />
            <LatestPosts posts={posts} />
        </>
    );
}

export default HomePage;

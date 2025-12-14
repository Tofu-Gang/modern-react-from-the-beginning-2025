import type { Route } from "./+types/index";
import type { Project, Post, StrapiResponse, StrapiProject, StrapiPost } from "~/types";
import FeaturedProjects from "../../components/FeaturedProjects";
import AboutPreview from "../../components/AboutPreview";
import LatestPosts from "../../components/LatestPosts";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | Welcome"},
        {name: "description", content: "Custom Website Development"},
    ];
}

export async function loader({ request }:Route.LoaderArgs):Promise<{ projects:Project[], posts: Post[] }> {
    const url = new URL(request.url);
    const [projectResponse, postsResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`),
        fetch(`${import.meta.env.VITE_API_URL}/posts?populate=image&sort[0]=date:desc`)
    ]);

    if (!projectResponse.ok || !postsResponse.ok) {
        throw new Error("Failed to fetch projects or posts");
    } else {
        const projectJson:StrapiResponse<StrapiProject> = await projectResponse.json();
        const postJson:StrapiResponse<StrapiPost> = await postsResponse.json();

        const projects = projectJson.data.map((item) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.title,
            description: item.description,
            image: item.image?.url ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}` : "/images/no-image.png",
            url: item.url,
            date: item.date,
            category: item.category,
            featured: item.featured
        }));

        const posts = postJson.data.map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt,
            date: item.date,
            body: item.body,
            image: item.image?.url ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}` : "/images/no-image.png"
        }));
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

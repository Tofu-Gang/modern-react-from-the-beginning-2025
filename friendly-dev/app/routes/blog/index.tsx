import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | BLog"},
        {name: "description", content: "Custom Website Development"},
    ];
}

export async function loader({ request }:Route.LoaderArgs):Promise<{ posts: PostMeta[] }> {
    const url = new URL("/posts-meta.json", request.url);
    const response = await fetch(url.href);
    if (!response.ok) {
        throw new Error("Failed to fetch data!");
    } else {
        const data = await response.json();
        return { posts: data };
    }
}

function BlogPage({ loaderData }:Route.ComponentProps) {
    const { posts } = loaderData;
    return <section><h2 className="text-3xl font-bold text-white mb-8">📝Blog</h2></section>;
}

export default BlogPage;

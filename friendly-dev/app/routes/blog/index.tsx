import { useState } from "react";
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";

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
        data.sort((a:PostMeta, b:PostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return { posts: data };
    }
}

function BlogPage({ loaderData }:Route.ComponentProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const { posts } = loaderData;
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = posts.slice(indexOfFirst, indexOfLast);

    return (
        <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
            <h2 className="text-3xl font-bold text-white mb-8">📝Blog</h2>
            {currentPosts.map((post) => <PostCard key={post.slug} post={post} />)}
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            )}
        </div>
    );
}

export default BlogPage;

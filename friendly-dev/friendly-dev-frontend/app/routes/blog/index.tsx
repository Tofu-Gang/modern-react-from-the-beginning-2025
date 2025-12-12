import { useState } from "react";
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import PostFilter from "../../components/PostFilter";
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
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { posts } = loaderData;

    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
    });

    const postsPerPage = 10;
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

    return (
        <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
            <h2 className="text-3xl font-bold text-white mb-8">📝Blog</h2>
            <PostFilter searchQuery={searchQuery} onSearchChange={(query) => {
                setSearchQuery(query);
                setCurrentPage(1);
            }} />
            <div className="space-y-8">{currentPosts.length === 0 ? (
                <p className="text-gray-400 text-center">No posts found!</p>
            ) : (
                currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
            )}</div>

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            )}
        </div>
    );
}

export default BlogPage;

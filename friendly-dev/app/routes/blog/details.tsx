import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";

export async function loader({ request, params }:Route.LoaderArgs) {
    const { slug } = params;
    const url = new URL("/posts-meta.json", request.url);
    const response = await fetch(url.href);
    if (!response.ok) {
        throw new Error("Failed to fetch data!");
    } else {
        const index = await response.json();
        const postMeta = index.find((post:PostMeta) => post.slug === slug);

        if (!postMeta) {
            throw new Response("Not Found", { status: 404 });
        } else {
            // Dynamically import raw markdown
            const markdown = await import(`../../posts/${slug}.md?raw`);
            return {
                postMeta,
                markdown: markdown.default
            };
        }
    }
}

function BlogPostDetailsPage({ loaderData }:Route.ComponentProps) {
    const { postMeta, markdown } = loaderData;
    return <>Blog</>
}

export default BlogPostDetailsPage;

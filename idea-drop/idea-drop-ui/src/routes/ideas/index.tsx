import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchIdeas } from "@/api/ideas.ts";
import IdeaCard from "@/components/IdeaCard.tsx";
import type { Idea } from "@/types.ts";

function ideasQueryOptions() {
    return queryOptions({
        queryKey: ["ideas"],
        queryFn: fetchIdeas
    });
}

export const Route = createFileRoute("/ideas/")({
    head: () => ({
        meta: [
            {
                title: "IdeaHub - Browse Ideas"
            }
        ]
    }),
    component: IdeasPage,
    loader: async ({ context:{queryClient} }) => {
        return queryClient.ensureQueryData(ideasQueryOptions());
    }
})

function IdeasPage() {
    const { data } = useSuspenseQuery(ideasQueryOptions());
    const ideas = [...data].sort((a:Idea, b:Idea) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Ideas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ideas.map((idea) => (
                    <IdeaCard key={idea._id} idea={idea} />
                ))}
            </div>
        </div>
    );
}

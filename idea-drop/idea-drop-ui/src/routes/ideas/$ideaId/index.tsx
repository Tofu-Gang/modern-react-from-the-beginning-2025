import {createFileRoute} from '@tanstack/react-router'

async function fetchIdea(ideaId:string) {
    const response = await fetch(`http://localhost:8000/ideas/${ideaId}`);

    if(!response.ok) {
        throw new Error(`Failed to fetch idea ${ideaId}`);
    } else {
        return await response.json();
    }
}

export const Route = createFileRoute('/ideas/$ideaId/')({
    component: IdeaDetailsPage,
    loader: async ({ params }) => fetchIdea(params.ideaId)
})

function IdeaDetailsPage() {
    const idea = Route.useLoaderData();
    return <div>{idea.title}</div>
}

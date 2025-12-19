import type { Idea } from "@/types.ts";
import api from "@/lib/axios.ts";

export async function fetchIdeas(): Promise<Idea[]> {
    const response = await api.get("/ideas");
    return response.data;
}

export async function fetchIdea(ideaId:string): Promise<Idea> {
    const response = await api.get(`/ideas/${ideaId}`);
    return response.data;
}

type NewFormIdeaType = {
    title: string;
    summary: string;
    description: string;
    tags: string[];
}

export async function createIdea(newIdea:NewFormIdeaType):Promise<Idea> {
    const response = await api.post("/ideas", {
        ...newIdea,
        createdAt: new Date().toISOString()
    });
    return response.data;
}

export async function deleteIdea(ideaId:string):Promise<void> {
    await api.delete(`/ideas/${ideaId}`);
}

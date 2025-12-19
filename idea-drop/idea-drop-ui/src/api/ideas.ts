import type { Idea, FormIdeaType, FormUpdatedIdeaType } from "@/types.ts";
import api from "@/lib/axios.ts";

export async function fetchIdeas(): Promise<Idea[]> {
    const response = await api.get("/ideas");
    return response.data;
}

export async function fetchIdea(ideaId:string): Promise<Idea> {
    const response = await api.get(`/ideas/${ideaId}`);
    return response.data;
}

export async function createIdea(newIdea:FormIdeaType):Promise<Idea> {
    const response = await api.post("/ideas", {
        ...newIdea,
        createdAt: new Date().toISOString()
    });
    return response.data;
}

export async function deleteIdea(ideaId:string):Promise<void> {
    await api.delete(`/ideas/${ideaId}`);
}

export async function updateIdea(ideaId:string, updatedData:FormUpdatedIdeaType):Promise<Idea> {
    const response = await api.put(`/ideas/${ideaId}`, updatedData);
    return response.data;
}

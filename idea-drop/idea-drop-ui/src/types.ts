export type Idea = {
    id: string;
    title: string;
    summary: string;
    description: string;
    tags: string[];
    createdAt: string;
    user: string;
}

export type FormIdeaType = {
    title: string;
    summary: string;
    description: string;
    tags: string[];
}

export type FormUpdatedIdeaType = {
    title: string;
    summary: string;
    description: string;
    tags: string[];
    createdAt: string;
}

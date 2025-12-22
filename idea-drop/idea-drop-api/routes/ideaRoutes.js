import express from "express";
import Idea from "../models/Idea.js";
import mongoose from "mongoose";

const router = express.Router();

// @route           GET /api/ideas
// @description     Get all ideas
// @access          Public
router.get("/", async (request, response, next) => {
    try {
        const ideas = await Idea.find();
        response.json(ideas);
    } catch(error) {
        console.log(error);
        next(error);
    }
});

// @route           GET /api/ideas/:id
// @description     Get a single idea
// @access          Public
router.get("/:id", async (request, response, next) => {
    const { id } = request.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        response.status(404);
        throw new Error("Idea not found!");
    }

    try {
        const idea = await Idea.findById(id);

        if(!idea) {
            response.status(404);
            throw new Error("Idea not found!");
        } else {
            response.json(idea);
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

// @route           POST /api/ideas
// @description     Create new idea
// @access          Public
router.post("/", async (request, response, next) => {
    try {
        const { title, summary, description, tags } = request.body;

        if(!title?.trim() || !summary?.trim() || !description?.trim()) {
            response.status(400);
            throw new Error("Title, summary and description are required!");
        } else {
            const newIdea = new Idea({
                title,
                summary,
                description,
                tags: typeof tags === "string" ?
                    tags.split(",").map((tag) => tag.trim()).filter(Boolean) :
                    Array.isArray(tags) ? tags : []
            });
            const savedIdea = await newIdea.save();
            response.status(201).json(savedIdea);
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

export default router;

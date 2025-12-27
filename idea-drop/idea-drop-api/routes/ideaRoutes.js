import express from "express";
import Idea from "../models/Idea.js";
import mongoose from "mongoose";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route           GET /api/ideas
// @description     Get all ideas
// @access          Public
// @query           _limit (optional limit for number of ideas returned)
router.get("/", async (request, response, next) => {
    try {
        const limit = parseInt(request.query._limit);
        const query = Idea.find().sort({ createdAt: -1 });

        if(!isNaN(limit) && limit > 0) {
            query.limit(limit);
        }

        const ideas = await query.exec();
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
router.post("/", protect, async (request, response, next) => {
    try {
        const { title, summary, description, tags } = request.body || {};

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

// @route           DELETE /api/ideas/:id
// @description     Delete a single idea
// @access          Public
router.delete("/:id", protect, async (request, response, next) => {
    const { id } = request.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        response.status(404);
        throw new Error("Idea not found!");
    }

    try {
        const idea = await Idea.findByIdAndDelete(id);

        if(!idea) {
            response.status(404);
            throw new Error("Idea not found!");
        } else {
            response.json({ message: "Idea deleted successfully!" });
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

// @route           PUT /api/ideas/:id
// @description     Update a single idea
// @access          Public
router.put("/:id", protect, async(request, response, next) => {
    try {
        const { id } = request.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            response.status(404);
            throw new Error("Idea not found!");
        } else {
            const { title, summary, description, tags } = request.body || {};

            if(!title?.trim() || !summary?.trim() || !description?.trim()) {
                response.status(400);
                throw new Error("Title, summary and description are required!");
            } else {
                const updatedIdea = await Idea.findByIdAndUpdate(id, {
                    title,
                    summary,
                    description,
                    tags: Array.isArray(tags) ? tags : tags.split(",").map((tag) => tag.trim()).filter(Boolean)
                }, {
                    new: true,
                    runValidators: true
                });

                if(!updatedIdea) {
                    response.status(404);
                    throw new Error("Idea not found!");
                } else {
                    response.json(updatedIdea);
                }
            }
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

export default router;

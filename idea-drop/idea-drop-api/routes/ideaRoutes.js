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
router.post("/", (request, response) => {
    const { title, description } = request.body;
    response.send(`<h1>Processed: ${title}</h1><p>${description}</p>`);
});

export default router;

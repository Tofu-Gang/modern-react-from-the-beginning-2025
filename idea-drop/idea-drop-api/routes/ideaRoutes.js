import express from "express";

const router = express.Router();

// @route           GET /api/ideas
// @description     Get all ideas
// @access          Public
router.get("/", (request, response) => {
    const ideas = [
        {id: 1, title: "Idea 1", description: "This is idea 1"},
        {id: 2, title: "Idea 2", description: "This is idea 2"},
        {id: 3, title: "Idea 3", description: "This is idea 3"},
    ];

    response.status(400);
    throw new Error("This is an error");
    response.json(ideas);
});

// @route           POST /api/ideas
// @description     Create new idea
// @access          Public
router.post("/", (request, response) => {
    const { title, description } = request.body;
    response.send(`<h1>Processed: ${title}</h1><p>${description}</p>`);
});

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/ideas", (request, response) => {
    const ideas = [
        {id: 1, title: "Idea 1", description: "This is idea 1"},
        {id: 2, title: "Idea 2", description: "This is idea 2"},
        {id: 3, title: "Idea 3", description: "This is idea 3"},
    ];
    response.json(ideas);
});

app.post("/api/ideas", (request, response) => {
    const { title, description } = request.body;
    response.send(`<h1>Processed: ${title}</h1><p>${description}</p>`);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

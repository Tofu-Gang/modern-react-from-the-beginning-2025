import express from "express";
import User from "../models/User.js";

const router = express.Router();

// @route           POST api/auth/register
// @description     Register a new user
// @access          Public
router.post("/register", async(request, response, next) => {
    try {
        const { name, email, password } = request.body;

        if(!name || !email || !password) {
            response.status(400);
            throw new Error("All fields are required!");
        } else {
            const existingUser = await User.findOne({ email });

            if(existingUser) {
                response.status(400);
                throw new Error("User already exists!");
            } else {
                const user = await User.create({ name, email, password });

                response.status(201).json({
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

export default router;

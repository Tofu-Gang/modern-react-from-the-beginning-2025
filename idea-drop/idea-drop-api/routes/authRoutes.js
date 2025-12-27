import express from "express";
import User from "../models/User.js";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "../utils/getJwtSecret.js";
import { generateToken } from "../utils/generateToken.js";

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
                // Create Tokens
                const payload = { userId: user._id.toString() };
                const accessToken = await generateToken(payload, "1m");
                const refreshToken = await generateToken(payload, "30d");
                // Set refresh token in HTTP-Only cookie
                response.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
                });

                response.status(201).json({
                    accessToken,
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

// @route           POST api/auth/login
// @description     Authenticate user
// @access          Public
router.post("/login", async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if(!email || !password) {
            response.status(400);
            throw new Error("Email and password are required!");
        } else {
            // Find user
            const user = await User.findOne({ email });

            if(!user) {
                response.status(401);
                throw new Error("Invalid credentials!");
            } else {
                // Check if password matches
                const isMatch = await user.matchPassword(password);

                if(!isMatch) {
                    response.status(401);
                    throw new Error("Invalid credentials!");
                } else {
                    // Create Tokens
                    const payload = { userId: user._id.toString() };
                    const accessToken = await generateToken(payload, "1m");
                    const refreshToken = await generateToken(payload, "30d");
                    // Set refresh token in HTTP-Only cookie
                    response.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "none",
                        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
                    });

                    response.status(201).json({
                        accessToken,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            }
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

// @route           POST api/auth/logout
// @description     Logout user and clear refresh token
// @access          Private
router.post("/logout", (request, response) => {
    response.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    });
    response.status(200).json({ message: "Logged out successfully!" });
});

// @route           POST api/auth/refresh
// @description     Generate new access token from refresh token
// @access          Public (Needs valid refresh token in cookie)
router.post("/refresh", async(request, response, next) => {
    try {
        const token = request.cookies?.refreshToken;
        console.log("Refreshing token...");

        if(!token) {
            response.status(401);
            throw new Error("No refresh token!");
        } else {
            const { payload } = await jwtVerify(token, JWT_SECRET);
            const user = await User.findById(payload.userId);

            if(!user) {
                response.status(401);
                throw new Error("No user!");
            } else {
                const newAccessToken = await generateToken({ userId: user._id.toString() }, "1m");
                response.json({
                    accessToken: newAccessToken,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        }
    } catch(error) {
        response.status(401);
        next(error);
    }
});

export default router;

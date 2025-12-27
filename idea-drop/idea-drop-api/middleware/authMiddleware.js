import { jwtVerify } from "jose";
import dotenv from "dotenv";
import User from "../models/User.js";
import { JWT_SECRET } from "../utils/getJwtSecret.js";

dotenv.config();

export async function protect(request, response, next) {
    try {
        const authHeader = request.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            response.status(401);
            throw new Error("Not authorized, no token!");
        } else {
            const token = authHeader.split(" ")[1];
            const { payload } = await jwtVerify(token, JWT_SECRET);
            const user = await User.findById(payload.userId).select("_id name email");

            if(!user) {
                response.status(401);
                throw new Error("User not found!");
            } else {
                request.user = user;
                next();
            }
        }
    } catch(error) {
        console.error(error);
        response.status(401);
        next(new Error("Not authorized, token failed!"));
    }
}

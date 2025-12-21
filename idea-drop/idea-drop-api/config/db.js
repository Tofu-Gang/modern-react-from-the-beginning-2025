import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch(error) {
        console.error(`Error: ${error.message}`);
        // Exit with failure
        process.exit(1);
    }
}

export default connectDB;

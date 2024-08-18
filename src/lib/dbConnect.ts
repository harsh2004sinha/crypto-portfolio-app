import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to the database.");
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable is not defined.");
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {});
        connection.isConnected = db.connections[0]?.readyState;
        console.log("Database connected.");
    } catch (err) {
        console.log("Database connection failed.");
        console.error(err);
        process.exit(1); // Use exit code 1 for a general error
    }
}

export default dbConnect;

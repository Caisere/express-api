import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { env } from "../validators/envValidation.js";

const prisma = new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ Connection error:", error.message);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log("✅ Database disconnected");
    } catch (err) {
        console.error("❌ Connection error:", err.message);
        process.exit(1);
    }
};

export { prisma, connectDB, disconnectDB };
import "dotenv/config";
import express from "express";
import cors from 'cors'
import { connectDB, disconnectDB } from "./config/db.js";

//import Routes
import movieRoutes from "./routes/movieRoute.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/usersRoute.js"
import watchlistRoutes from './routes/watchlistRoute.js'
import { env } from "./validators/envValidation.js";
import cookieParser from "cookie-parser";

// instantiate express
const app = express();


app.use(cookieParser())

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)


//body parser middleware
app.use(express.json()); //Built in middleware for express to properly handle json data.
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use('/users', userRoutes)
app.use('/watchlist', watchlistRoutes)

app.get("/", (req, res) => {
    return res.json({
        message: "This is the Home Page of the Movie WatchedList API",
    });
});

// Connect to database and start server
let server;
const startServer = async () => {
    try {
        await connectDB();
        server = app.listen(env.PORT, () => {
            console.log(`Running server at port ${env.PORT}`);
        });

        return server;
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

await startServer();

//Handle unhandled promise rejection (e.g. database connection error)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection", err);
    if (server) {
        server.close(async () => {
            await disconnectDB();
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Handle uncaught error
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception", err);
    await disconnectDB();
    process.exit(1);
});

//Gracefully shut-down
process.on("SIGTERM", async (err) => {
    console.error("SIGTERM received, shutting down gracefully");
    if (server) {
        server.close(async () => {
            await disconnectDB();
            process.exit(1);
        });
    } else {
        await disconnectDB();
        process.exit(1);
    }
});

// HTTP Methods: GET, POST, PUT, DELETE

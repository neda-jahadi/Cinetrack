import express from 'express';
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from './configs/mongodb.js';
import JobRoutes from "./routes/job.route.js";
import AuthRoutes from "./routes/auth.route.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// CORS for Vite dev
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", AuthRoutes);
app.use("/api/jobs", JobRoutes);
app.use("/api/watchlist", watchlistRoutes)

if(process.env.NODE_ENV === "production") {
    const clientDistPath = path.join(__dirname, "client", "dist");
    app.use(express.static(clientDistPath))
    app.get("*", (req, res) => {
        res.sendFile(path.join(clientDistPath, "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT)
})

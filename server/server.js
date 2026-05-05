import express from 'express';
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import JobRoutes from "./routes/job.route.js";
import AuthRoutes from "./routes/auth.route.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

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
app.use("/api/movies", movieRoutes)
app.use("/api/companies", companyRoutes)

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

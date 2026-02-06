import express from 'express';
import dotenv from "dotenv";
import path from "path";
import { connectDB } from './configs/mongodb.js';
import JobRoutes from "./routes/job.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use(express.json());
app.use("/api/jobs", JobRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"client","dist","index.html"))
    });
}



app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT)
})

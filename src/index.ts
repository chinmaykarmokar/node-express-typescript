import express, { Request, Response } from "express";
import connectDB from "../config/ormconfig";

// Import Authentication Route
import loginAuthRoutes from "./authentication/loginAuthRoutes";

// Import API Routes
import studentRoutes from "./routes/studentRoutes";
import movieRoutes from "./routes/movieRoutes";

// Use Enviroment Variables
import dotenv from "dotenv";
dotenv.config()

const app = express();
const cors = require("cors");

// Parse JSON 
app.use(express.json());

// Use CORS
app.use(cors());

// Create connection with database
connectDB();

// Fetching API from the routes
app.use("/api/auth", loginAuthRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/movies", movieRoutes);

const port = process.env.PORT || process.env.SERVER_PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
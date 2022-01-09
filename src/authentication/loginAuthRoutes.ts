import express, { Request, Response } from "express";

const jwt = require("jsonwebtoken");
const router = express.Router();

// Use Enviroment Variables
import dotenv from "dotenv";
dotenv.config();

// Import authMiddleware
import authenticateToken from "../middlewares/authMiddleware";

// Login route
router.post("/login", async (req: Request, res: Response) => {
    const student = { name: req.body.name }
    
    const accessToken = jwt.sign(student, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    
    res.json(
        {
            accessToken: accessToken
        }
    )
})

export default router;
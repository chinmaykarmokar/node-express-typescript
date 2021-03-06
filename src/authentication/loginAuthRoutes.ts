import express, { Request, Response } from "express";
import { TokenList } from "../Entities/TokenList";
import { Students } from "../Entities/Students";

const jwt = require("jsonwebtoken");
const router = express.Router();

// Create unique ids
const crypto = require("crypto");
const unique_id = crypto.randomBytes(16).toString("hex");

// Use Enviroment Variables
import dotenv from "dotenv";
dotenv.config();

// Import Application Logger
import logger from "../../loggers/logger";

// Login route
router.post("/login", async (req: Request, res: Response) => {
    const studentExists = await Students.findOne({ where: {name: req.body.name} });

    console.log(studentExists);

    if (studentExists) {
        const student = { name: req.body.name, unique_id: unique_id }
    
        const accessToken = await jwt.sign(student, process.env.ACCESS_TOKEN_SECRET);
        
        try {
            console.log(student.unique_id);
            
            await TokenList.insert(
                {
                    name: student.name,
                    unique_id: student.unique_id,
                    token_issued: accessToken
                }
            );

            res.json(
                {   
                    status: "Token stored in database",
                    accessToken: accessToken
                }
            )

            logger.info(`User ${student.name} granted access for login.`);
        }
        catch (err) {
            throw err;

            logger.error(`User ${student.name} not granted access for login.`);
        }
    }
    else {
        res.json({
            status: "Student of this name does not exist."
        })

        logger.error(`Student of the name ${req.body.name} does not exist.`);
    }
})

export default router;
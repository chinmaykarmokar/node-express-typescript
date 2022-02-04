import express, { Request, Response } from "express";
import { Students } from "../Entities/Students";

// Import Middleware
import authenticateToken from "../middlewares/authMiddleware";

// Import Application Logger
import logger from "../../loggers/logger";

// Import Validator
import Joi from "joi";

const router = express.Router();

router.get("/", authenticateToken, async (req: any, res: Response) => {
    await Students.findOne({ name: req.user.name }).then((data) => {
        res.json(data);
    })

    logger.info(`Successfully logged in for student: ${req.user.name}`);
})

router.post("/", async (req: Request, res: Response) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            age: Joi.number().required(),
            email: Joi.string().email().required(),
            hobby: Joi.string().required()
        })

        if (schema.validate(req.body).error) {
            res.json({
                validationErrors: schema.validate(req.body).error?.details
            })

            logger.error(`Incorrect payload provided for adding new students.`);
        }

        else {
            await Students.insert(schema.validate(req.body).value);

            res.json({
                message: "Values have been inserted successfuly."
            });

            logger.info("POST request made for students API.")
        }
    } catch (error) {
        throw error;
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    const student = await Students.findOne(req.params.id);

    if (student) {
        await Students.update(student,req.body);

        res.json({
            message: "Values updated successfully."
        })

        logger.info(`PUT request made for students API for id: ${req.params.id}`);
    } 
    else {
        res.json({
            message: "Student not found."
        })

        logger.error(`PUT request failed. No student found with id: ${req.params.id}`);
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    await Students.delete(req.params.id);

    res.json({
        message: "Record deleted successfully."
    })

    logger.info(`DELETE request made for student with id: ${req.params.id}`);
})

export default router;
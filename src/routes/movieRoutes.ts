import express, { Request, Response } from "express";
import { Movies } from "../Entities/Movies";

// Import Application Logger
import logger from "../../loggers/logger";

// Import Validator
import Joi from "joi";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    await Movies.find().then((data) => {
        res.json(
            {
                data: data,
                worker: process.pid
            }
        );

        logger.info("GET request made for movies API.");
    })
})

router.post("/", async (req: Request, res: Response) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            year_released: Joi.number().required(),
            rating: Joi.number().required()
        })

        if (schema.validate(req.body).error) {
            res.json({
                validationErrors: schema.validate(req.body).error?.details
            })

            logger.error(`Incorrect payload provided for adding new movie.`);
        }

        else {
            await Movies.insert(schema.validate(req.body).value);

            res.json({
                message: "Values have been inserted successfuly."
            });

            logger.info("POST request made for movies API.");
        }
    } catch (error) {
        throw error;

        logger.error("Error while making POST request.")
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    const movie = await Movies.findOne(req.params.id);

    if (movie) {
        await Movies.update(movie,req.body);

        res.json({
            message: "Values updated successfully."
        })

        logger.info(`PUT request made for movies API for id: ${req.params.id}`);
    } 
    else {
        res.json({
            message: "Student not found."
        })

        logger.error(`PUT request failed. No movie found with id: ${req.params.id}`);
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    await Movies.delete(req.params.id);

    res.json({
        message: "Record deleted successfully."
    })

    logger.info(`DELETE request made for movie with id: ${req.params.id}`);
})

export default router;
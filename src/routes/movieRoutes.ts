import express, { Request, Response } from "express";
import { Movies } from "../Entities/Movies";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    await Movies.find().then((data) => {
        res.json(
            {
                data: data,
                worker: process.pid
            }
        );
    })
})

router.post("/", async (req: Request, res: Response) => {
    try {
        await Movies.insert(req.body);

        res.json({
            message: "Values have been inserted successfuly."
        });
    } catch (error) {
        throw error;
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    const movie = await Movies.findOne(req.params.id);

    if (movie) {
        await Movies.update(movie,req.body);

        res.json({
            message: "Values updated successfully."
        })
    } 
    else {
        res.json({
            message: "Student not found."
        })
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    await Movies.delete(req.params.id);

    res.json({
        message: "Record deleted successfully."
    })
})

export default router;
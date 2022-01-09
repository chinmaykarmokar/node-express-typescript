import express, { Request, Response } from "express";
import { Students } from "../Entities/Students";

// Import Middleware
import authenticateToken from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, async (req: any, res: Response) => {
    await Students.findOne({ name: req.user.name }).then((data) => {
        res.json(data);
    })
})

router.post("/", async (req: Request, res: Response) => {
    try {
        await Students.insert(req.body);

        res.json({
            message: "Values have been inserted successfuly."
        });
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
    } 
    else {
        res.json({
            message: "Student not found."
        })
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    await Students.delete(req.params.id);

    res.json({
        message: "Record deleted successfully."
    })
})

export default router;
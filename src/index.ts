import express, { Request, Response } from "express";
import connectDB from "../config/ormconfig";
import studentRoutes from "./routes/studentRoutes";
import { Students } from "./Entities/Students";

const app = express();

// Parse JSON 
app.use(express.json());

// Create connection with database
connectDB();

// Fetching API from several routes
app.use("/api/students", studentRoutes);

// app.get("/", async (req: Request, res: Response) => {
//     await Students.find().then((data) => {
//         res.json(data);
//     })
// })

// app.post("/api/students", async (req: Request, res: Response) => {
//     try {
//         await Students.insert(req.body);

//         res.json({
//             message: "Values have been inserted successfuly."
//         });
//     } catch (error) {
//         throw error;
//     }
// })

// app.put("/api/students/:id", async (req: Request, res: Response) => {
//     const student = await Students.findOne(req.params.id);

//     if (student) {
//         await Students.update(student,req.body);

//         res.json({
//             message: "Values updated successfully."
//         })
//     } 
//     else {
//         res.json({
//             message: "Student not found."
//         })
//     }
// })

// app.delete("/api/students/:id", async (req: Request, res: Response) => {
//     await Students.delete(req.params.id);

//     res.json({
//         message: "Record deleted successfully."
//     })
// })

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
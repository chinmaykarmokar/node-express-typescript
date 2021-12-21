import express, { Request, Response } from "express";
const app = express();

// Parse JSON 
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Hello, this is Node.js, Express.js and TypeScript."
    })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
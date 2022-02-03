import { createConnection } from "typeorm";

// Use Enviroment Variables
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    return createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URI,
        // logging: true,
        synchronize: true,
        entities: ["./src/Entities/**/*.ts"],
        extra: {
            ssl: {
                "rejectUnauthorized": false
            }
        }
    });
}

export default connectDB;
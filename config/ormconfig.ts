import { createConnection } from "typeorm";

const connectDB = async () => {
    createConnection({
        type: 'postgres',
        url: 'xyz',
        logging: true,
        synchronize: true,
        entities: ["./src/Entities/**/*.ts"],
        extra: {
            ssl: {
                "rejectUnauthorized": false
            }
        }
    })
}

export default connectDB;
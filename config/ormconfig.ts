import { createConnection } from "typeorm";

const connectDB = async () => {
    createConnection({
        type: 'postgres',
        url: 'postgres://fzeduekrhbkoml:931835e12acbdd388d36eb03c644df626f649ee79893e521ce867dbd82f80ace@ec2-52-206-193-199.compute-1.amazonaws.com:5432/d3jl1ecplgceat',
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
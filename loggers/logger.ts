import { timeStamp } from "console";

const { createLogger, format, transports } = require("winston");

interface loggerSpecifications {
    level: string;
    message: string;
    timestamp: Date
} 

const logFormat = format.printf((info: loggerSpecifications) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
})

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), 
        logFormat,
        format.json()
    ),
    transports: [
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log", level: "info" }),
    ]
})

export default logger;
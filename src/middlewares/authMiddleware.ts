import { TokenList } from "../Entities/TokenList";
const jwt = require("jsonwebtoken");

// Use Enviroment Variables
import dotenv from "dotenv";
dotenv.config();

const authenticateToken = async (req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    const findUser = await TokenList.find(
        { 
            where: {token_issued: token},
            order: {id: "DESC"}, 
        }
    )

    const tokenValidTime = Math.abs(new Date().valueOf() - findUser[0].token_created_on.valueOf())/60000;

    const latestToken = await TokenList.find(
        { 
            where: {name: findUser[0]?.name},
            order: {id: "DESC"}, 
            take: 1 
        }
    );

    const tokenInUse = await TokenList.findOne({ where: {name: findUser[0]?.name, token_issued: token} })

    console.log({latest_token: latestToken[0].unique_id});
    console.log({inUse: tokenInUse?.unique_id});

    if (token == null) {
        return res.sendStatus(401);
    }

    if (latestToken[0].unique_id != tokenInUse?.unique_id || tokenValidTime >= 0.95) {
        return res.status(401).json({
            message: "This token has been invalidated."
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    })
}

export default authenticateToken;
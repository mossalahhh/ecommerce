import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Db/connection.js";
import { appRouter } from "./src/appRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
appRouter(app , express);
connectDb();

app.listen(port, () => console.log(`App Running on port ${port}!`));

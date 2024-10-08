import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import config from "./config";

const cors = require('cors')

dotenv.config();

const app: Express = express();
const port = config.app.port;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
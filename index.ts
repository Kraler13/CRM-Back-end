import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import config from "./config";
import cors from "cors";
import mongoose from "mongoose";
import ClientRoutes from "./app/routes/ClientRoutes";

dotenv.config();

const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log("połączona z mongo")
  })
  .catch((err) => {
    throw err
  })

const app: Express = express();
const port = config.app.port;

app.use(express.json())
app.use(cors());

app.use('/clients', ClientRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
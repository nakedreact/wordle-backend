import cors from "cors";
import express, { application } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import gets from "./routes/paths.js";

dotenv.config();

const uri = process.env.MONGO_URI;
export const client = new MongoClient(uri);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/gets", gets);

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});

import moment from "moment";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DATE_FORMAT } from "./constants.js";
import { MongoClient } from "mongodb";
import { client } from "./server.js";

// export const DB_CONN = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1); // 1 code means failure, 0 means success
//   }
// };

// export const MONGO_CONN = async () => {
//   try {
//     const uri =
//       "mongodb+srv://sebastiancv5000:vYT3Iq5BS3URgy9f@cluster0.gywqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//     const client = new MongoClient(uri);
//     const database = client.db("wordDatabase");
//     const collection = database.collection("fiveLetterWords");
//     const NOT_FOUND = "No definition found";
//     function delay(ms) {
//       return new Promise((resolve) => setTimeout(resolve, ms));
//     }
//     return client;
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1); // 1 code means failure, 0 means success
//   }
// };

// export const getWord = async () => {
//   const query = { date: "2025-01-25" };
//   const result = await collection.find(query);
//   if (result) {
//     WoD = {
//       word: result.word,
//       definition: result.definition,
//     };
//     return WoD;
//   } else {
//     console.log("Not found");
//     return null;
//   }
// };
// export const getWord = () => {
// try {
//   const query = { date: "2025-01-25" };
//   const database = client.db("wordDatabase"); // Replace with your database name
//   const collection = database.collection("fiveLetterWords"); // Replace with your collection name

//   const items = collection.findOne(query);
//   return items.word;
// } catch (error) {
//   res
//     .status(500)
//     .json({ message: "Error fetching items", error: error.message });
// }

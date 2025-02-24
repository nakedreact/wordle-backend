import fs from "fs";
import moment from "moment";
import { MONGO_CONN } from "../mongoConnection.js";
export const DATE_FORMAT = "YYYY-MM-DD";

// MongoDB connection details

MONGO_CONN();

// Function to fetch word definition
async function wordDef(word) {
  const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const response = await fetch(apiURL);

    console.log(response.ok);

    if (!response.ok) {
      console.error(`API Did not return anything`, response.statusText, word);
      return NOT_FOUND;
    }

    const data = await response.json();
    const firstDefinition = data[0].meanings[0].definitions[0].definition;

    return firstDefinition || NOT_FOUND;
  } catch (error) {
    console.error(`Error fetching definition for "${word}":`, error);
    return NOT_FOUND;
  }
}

// Function to upload words with incremental dates
async function uploadWords(client) {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB.");

    // Read the words from the text file
    const wordPath = "words.txt";
    const data = fs.readFileSync(wordPath, "utf-8");
    const words = data
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length === 5);

    // Start with the current date
    let currentDate = moment();

    // Prepare the documents with definitions and dates

    const documents = [];
    for (const word of words) {
      const definition = await wordDef(word);
      if (!definition) continue;
      const document = {
        word,
        date: currentDate.format(DATE_FORMAT),
        definition,
      };
      documents.push(document);
      console.log(currentDate.format(DATE_FORMAT));
      currentDate = currentDate.add(1, "days"); // Increment the date
      await delay(2000); // Wait for 200ms before the next request
      await collection.insertOne(document);
    }

    // Insert the documents into the collection
    console.log(`${documents.length} words were inserted into the database.`);
  } catch (err) {
    console.error("Error uploading words:", err);
  } finally {
    // Close the database connection
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

// Execute the upload function
uploadWords().catch(console.error);

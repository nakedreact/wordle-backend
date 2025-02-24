import { client } from "../server.js";
import express from "express";
import moment from "moment";

const router = express.Router();

export default router;

function checkWord(input, target) {
  input = input.toLowerCase();
  target = target.toLowerCase();

  const result = [];
  const letters = target.split("");

  for (let i = 0; i < input.length; i++) {
    const num = i + 1;
    if (input[i] === target[i]) {
      result.push({ [num]: input[i], place: "correct" });
      letters[i] = null;
    } else {
      result.push({ [num]: input[i], place: "unknown" });
    }
  }

  for (let i = 0; i < input.length; i++) {
    const num = i + 1;
    if (result[i].place === "unknown") {
      const index = letters.indexOf(result[i][num]);
      if (index !== -1) {
        result[i].place = "misplaced";
        letters[index] = null;
      } else {
        result[i].place = "incorrect";
      }
    }
  }

  return result;
}

router.get("/tries", (req, res) => {
  const check = checkWord("think", "think");
  res.status(200).json({ check });
});

router.get("/items", async (req, res) => {
  //   const word = getWord();
  //   console.log(word);
  //   res.status(200).json(word);
  try {
    const query = { date: moment().format("YYYY-MM-DD") };
    const database = client.db("wordDatabase");
    const collection = database.collection("fiveLetterWords");

    const items = await collection.findOne(query);
    console.log(items);
    res.status(200).json({ word: items.word, definition: items.definition });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching items", error: error.message });
  }
});

router.post("/validate", async (req, res) => {
  const database = client.db("wordDatabase");
  const collection = database.collection("fiveLetterWords");
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: "No word provided" });
  const foundWord = await collection.findOne({ word });

  if (foundWord) {
    res.json({ definition: foundWord.definition });
  } else res.json({ definition: null });
});

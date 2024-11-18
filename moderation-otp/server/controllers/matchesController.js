const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

exports.getMatches = async (req, res) => {
  const league = req.headers["league"];
  const week = req.headers["week"];
  console.log(`Received headers: league=${league}, week=${week}`); 

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db();
    const collectionName = `${league}_${week}`;
    console.log(`Fetching matches from collection: ${collectionName}`);
    const matches = await db.collection(collectionName).find({}).toArray();
    if (matches.length === 0) {
      console.log(`No matches found for ${collectionName}`);
    } else {
      console.log(`Matches found: ${matches.length}`);
      console.log(matches); 
    }
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  } finally {
    await client.close();
  }
};

const mongoose = require("mongoose");
const Dispos = require("../models/Dispos");

const getDispos = async (req, res) => {
  const { ligue } = req.query;
  if (!ligue) {
    return res.status(400).send("Ligue is required");
  }

  const collectionName = `dispos_${ligue}`;
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((c) => c.name);
    if (!collectionNames.includes(collectionName)) {
      return res
        .status(404)
        .send(`Collection ${collectionName} does not exist`);
    }

    let DisposModel;
    if (mongoose.models[collectionName]) {
      DisposModel = mongoose.models[collectionName];
    } else {
      DisposModel = mongoose.model(
        collectionName,
        new mongoose.Schema({}, { strict: false }),
        collectionName
      );
    }

    const dispos = await DisposModel.find();
    res.json(dispos);
  } catch (error) {
    console.error("Error fetching dispos:", error);
    res.status(500).send(error.message);
  }
};

const createDispo = async (req, res) => {
  const { id, resourceId, start, end, title, color } = req.body;

  if (!id || !resourceId || !start || !end || !title) {
    console.error("Missing fields:", { id, resourceId, start, end, title });
    return res.status(400).send("All fields are required");
  }

  try {
    const newDispo = new Dispos({
      id,
      resourceId,
      start,
      end,
      title,
      color,
    });

    await newDispo.save();
    res.status(201).json(newDispo);
  } catch (error) {
    console.error("Error creating dispo:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { getDispos, createDispo };

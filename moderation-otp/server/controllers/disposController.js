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
        Dispos.schema,
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
  const { ligue } = req.headers;

  console.log("Received data:", { id, resourceId, start, end, title, color });

  if (!id || !resourceId || !start || !end || !title || !ligue) {
    return res.status(400).send("All fields are required");
  }

  const collectionName = `dispos_${ligue}`;
  let DisposModel;
  if (mongoose.models[collectionName]) {
    DisposModel = mongoose.models[collectionName];
  } else {
    DisposModel = mongoose.model(collectionName, Dispos.schema, collectionName);
  }

  try {
    const newDispo = new DisposModel({
      id,
      resourceId,
      start,
      end,
      title,
      color,
    });

    console.log("New Dispo:", newDispo);

    await newDispo.save();
    res.status(201).json(newDispo);
  } catch (error) {
    console.error("Error creating dispo:", error);
    res.status(500).send("Error creating dispo");
  }
};

const deleteDispos = async (req, res) => {
  const { id } = req.body; // Récupérer l'ID depuis le corps de la requête
  const { ligue } = req.headers;

  if (!id || !ligue) {
    return res.status(400).send("ID and ligue are required");
  }

  console.log(`Deleting event with ID: ${id} in league: ${ligue}`);

  const collectionName = `dispos_${ligue}`;
  let DisposModel;
  if (mongoose.models[collectionName]) {
    DisposModel = mongoose.models[collectionName];
  } else {
    DisposModel = mongoose.model(collectionName, Dispos.schema, collectionName);
  }

  try {
    const deletedDispo = await DisposModel.findOneAndDelete({ id });
    if (!deletedDispo) {
      return res.status(404).send("Dispo not found");
    }

    res.status(200).json({ message: "Dispo deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getDispos, createDispo, deleteDispos };

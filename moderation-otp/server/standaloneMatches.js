const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const inputUrl = "https://assets.onetrick.dev/json/matches_lol";
const outputDir = "./datas";

const {
  processMatches,
  writeOutputFiles,
  uploadToMongoDB,
} = require("./processMatches");

axios
  .get(inputUrl)
  .then((response) => {
    console.log("Lecture du fichier depuis l'URL réussie");

    const matches = response.data;

    console.log(`Nombre de matchs lus: ${matches.length}`);

    const matchesByLeague = processMatches(matches);

    console.log("Traitement des matchs terminé");

    writeOutputFiles(matchesByLeague, outputDir);

    // Envoyer les données à MongoDB
    uploadToMongoDB(matchesByLeague);
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération du fichier JSON:", error);
  });

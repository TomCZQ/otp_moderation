const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Fonction utilitaire pour obtenir la semaine de l'année
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Fonction pour traiter les matchs
function processMatches(matches) {
  console.log("Début du traitement des matchs");

  const currentDate = new Date();

  // Regrouper les matchs par ligue et par semaine
  const matchesByLeague = {};
  matches.forEach((match) => {
    const matchDate = new Date(match.date);
    if (matchDate > currentDate) {
      // Vérifier si le match est dans le futur
      const leagueName = match.competition.name;
      const weekNumber = getWeekNumber(matchDate);
      const leagueWeekKey = `${leagueName}_${weekNumber}`;
      if (!matchesByLeague[leagueWeekKey]) {
        matchesByLeague[leagueWeekKey] = [];
      }
      matchesByLeague[leagueWeekKey].push({
        date: match.date,
        bo: match.bo,
        title: match.title,
        teams: [match.teams[0].obj.name, match.teams[1].obj.name],
        accronyms: [match.teams[0].obj.accronym, match.teams[1].obj.accronym],
      });
      console.log(
        `Ajouté match: ${match.title} à la ligue: ${leagueName}, semaine: ${weekNumber}`
      );
    }
  });

  console.log("Regroupement des matchs par ligue terminé");

  return matchesByLeague;
}

// Fonction pour écrire les fichiers de sortie
function writeOutputFiles(matchesByLeague, outputDir) {
  // Créer le répertoire de sortie s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Écrire les fichiers pour chaque ligue et semaine
  Object.keys(matchesByLeague).forEach((leagueWeekKey) => {
    const filePath = path.join(outputDir, `${leagueWeekKey}.json`);
    fs.writeFile(
      filePath,
      JSON.stringify(matchesByLeague[leagueWeekKey], null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error(
            `Erreur lors de l'écriture du fichier ${leagueWeekKey}:`,
            err
          );
        } else {
          console.log(`Fichier ${filePath} créé avec succès`);
        }
      }
    );
  });

  console.log("Écriture des fichiers de sortie terminée");
}

// Fonction pour envoyer les données à MongoDB
async function uploadToMongoDB(matchesByLeague) {
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connecté à MongoDB");

    const db = client.db();

    for (const leagueWeekKey of Object.keys(matchesByLeague)) {
      const weekMatches = matchesByLeague[leagueWeekKey];
      const collectionName = leagueWeekKey;

      const collection = db.collection(collectionName);

      // Supprimer les anciennes données de la collection
      await collection.deleteMany({});
      // Insérer les nouvelles données
      await collection.insertMany(weekMatches);

      console.log(`Données insérées dans la collection ${collectionName}`);
    }
  } catch (err) {
    console.error("Erreur lors de l'insertion dans MongoDB:", err);
  } finally {
    await client.close();
    console.log("Connexion à MongoDB fermée");
  }
}

module.exports = { processMatches, writeOutputFiles, uploadToMongoDB };

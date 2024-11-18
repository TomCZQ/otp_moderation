const cron = require("node-cron");
const { exec } = require("child_process");

// Fonction pour exécuter le script
const runScript = () => {
  exec("node standaloneMatches.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'exécution du script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erreur dans le script: ${stderr}`);
      return;
    }
    console.log(`Résultat du script: ${stdout}`);
  });
};

// Planification du cron job pour s'exécuter à midi et à minuit
cron.schedule("0 0,12 * * *", () => {
  console.log("Exécution du script standaloneMatches.js");
  runScript();
});

console.log(
  "Cron job configuré pour exécuter standaloneMatches.js à midi et à minuit."
);

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");
const generatePassword = require("./utils/passwordGenerator");

dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

const ROLE_ID = "1043572037479829575"; // ID du rôle spécifique

const createAccounts = async () => {
  const createdUsers = [];
  try {
    // Connectez-vous à la base de données
    await mongoose.connect(process.env.MONGODB_URI);

    const membersFilePath = path.join(__dirname, "members.json");
    const membersData = fs.readFileSync(membersFilePath, "utf-8");
    const members = JSON.parse(membersData);

    for (const member of members) {
      if (member.roles.includes(ROLE_ID)) {
        const existingUser = await User.findOne({
          username: member.user.username,
        });

        if (existingUser) {
          console.log(
            `Account creation skipped for user: ${member.user.username} (username already exists)`
          );
          continue;
        }

        const password = generatePassword(15);
        const hashedPassword = await bcrypt.hash(password, 10);

        const userJson = {
          username: member.user.username,
          password: hashedPassword,
          id: member.user.id,
          avatar: `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`,
          roles: member.roles,
          nick: member.nick || member.user.username,
        };

        await User.findOneAndUpdate({ id: member.user.id }, userJson, {
          upsert: true,
          new: true,
        });

        createdUsers.push({
          username: member.user.username,
          password: password,
        });

        console.log(
          `Account created/updated for user: ${member.user.username}`
        );
        console.log(`Username: ${member.user.username}`);
        console.log(`Password: ${password}`);
      }
    }

    const outputFilePath = path.join(__dirname, "created_users.json");
    fs.writeFileSync(outputFilePath, JSON.stringify(createdUsers, null, 2));
    console.log(`Created users saved to ${outputFilePath}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error creating accounts:", error);
  }
};

createAccounts();

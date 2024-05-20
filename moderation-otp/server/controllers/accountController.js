const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const generatePassword = require('../utils/passwordGenerator');

const ROLE_ID = "1043572037479829575"; // ID du rôle spécifique

const createAccounts = async () => {
  try {
    const membersFilePath = path.join(__dirname, '../members.json');
    const membersData = fs.readFileSync(membersFilePath, 'utf-8');
    const members = JSON.parse(membersData);

    for (const member of members) {
      if (member.roles.includes(ROLE_ID)) {
        const existingUser = await User.findOne({ username: member.user.username });
        
        if (existingUser) {
          console.log(`Account creation skipped for user: ${member.user.username} (username already exists)`);
          continue; // Saute la création de ce compte
        }

        const password = generatePassword(12); // Générer un mot de passe de 12 caractères
        const hashedPassword = await bcrypt.hash(password, 10);

        const userJson = {
          username: member.user.username,
          password: hashedPassword,
          id: member.user.id,
          avatar: `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`,
          roles: member.roles
        };

        // Mettez à jour ou créez un nouvel utilisateur dans la base de données
        await User.findOneAndUpdate(
          { id: member.user.id },
          userJson,
          { upsert: true, new: true }
        );

        console.log(`Account created/updated for user: ${member.user.username}`);
      }
    }
  } catch (error) {
    console.error('Error creating accounts:', error);
  }
};

module.exports = createAccounts;

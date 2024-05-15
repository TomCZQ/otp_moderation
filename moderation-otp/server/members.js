const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();

// Configurer CORS pour permettre les requêtes provenant du frontend
app.use(cors({
    origin: process.env.FRONT_URL,
    methods: ['GET'],
    allowedHeaders: '*',
    credentials: true,
}));

// Configurer Express pour parser le JSON
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Route pour obtenir les membres de Discord
app.get('/members', async (req, res) => {
    const token = process.env.ClientToken;
    const limit = req.query.limit || 1000;

    try {
        const response = await axios.get(`https://discord.com/api/guilds/1023566432832860220/members?limit=${limit}`, {
            headers: {
                Authorization: `Bot ${token}`
            }
        });

        const data = response.data;
        
        const filePath = path.join(__dirname, 'members.json');
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Failed to write file:', err);
                return res.status(500).send('Failed to write file');
            }
            res.sendFile(filePath);
        });
    } catch (error) {
        console.error('Failed to fetch members:', error);
        res.status(500).send('Failed to fetch members');
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

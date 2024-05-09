const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET'], 
    allowedHeaders: '*',  // Autorise tous les headers
    credentials: true, 
}));


app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/members', async (req, res) => {
    const token = 'MTIzNzc2ODk1MDgxMzgxODkyMA.GKaGbT.eljECslObsqSSzL7JVnqkj1aYqlGz7D4o2_qCk'; // Assurez-vous de remplacer cela par un token valide
    const limit = req.query.limit || 1000;

    try {
        const response = await axios.get(`https://discord.com/api/guilds/1023566432832860220/members?limit=1000`, {
            headers: {
                Authorization: `Bot ${token}`
            },
            params: {
                limit: limit
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

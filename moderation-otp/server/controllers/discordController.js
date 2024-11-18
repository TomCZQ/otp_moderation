const axios = require("axios");
const fs = require("fs");
const path = require("path");

exports.getMembers = async (req, res) => {
  const token = process.env.ClientToken;
  const limit = req.query.limit || 1000;

  try {
    const response = await axios.get(
      `https://discord.com/api/guilds/1023566432832860220/members?limit=${limit}`,
      {
        headers: {
          Authorization: `Bot ${token}`,
        },
      }
    );

    const data = response.data;

    const filePath = path.join(__dirname, "..", "members.json");
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error("Failed to write file:", err);
        return res.status(500).send("Failed to write file");
      }
      res.sendFile(filePath);
    });
  } catch (error) {
    console.error("Failed to fetch members:", error);
    res.status(500).send("Failed to fetch members");
  }
};

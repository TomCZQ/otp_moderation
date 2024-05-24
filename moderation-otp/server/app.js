const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const matchesRoutes = require("./routes/matchesRoutes");
const userRoutes = require("./routes/userRoutes");
const disposRoutes = require("./routes/disposRoutes");
const morgan = require("morgan");

dotenv.config();
connectDB();

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api", matchesRoutes);
app.use("/api", disposRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

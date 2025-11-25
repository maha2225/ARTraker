require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const db = require("./models");  // ⬅️ Sequelize initialization

const app = express();

db.sequelize.authenticate()
  .then(() => console.log("Connected to Supabase Postgres"))
  .catch(err => console.error("DB Connection Error:", err));

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(bodyParser.json());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("ART Tracker API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

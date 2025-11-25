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

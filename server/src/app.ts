import express = require("express");
import multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());


app.get("/", (req, res) => {
  console.log("hi");
  res.send("sup");
});

const healthRoutes = require("./routes/plant_routes");
app.use("/api", healthRoutes);

module.exports = app;
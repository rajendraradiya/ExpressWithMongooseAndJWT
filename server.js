require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const logger = require("./src/plugin/logger");
const app = express();
app.use(express.json());

const authRoutes = require("./src/routes");

app.use("/api/v1/", authRoutes);

mongoose.connect(process.env.DATABASE_NAME);

const db = mongoose.connection;
db.on("error", (error) => logger.fatal(error));
db.once("open", () => logger.info("Connected to Database"));

app.listen(3000, () => {
  logger.info("Server is listen on port:3000");
});

const express = require("express");
const route = express.Router();

const authRoutes = require("./authentication");
const notesRoutes = require("./notes");

route.use('/auth', authRoutes)
route.use('/notes', notesRoutes)

module.exports = route;

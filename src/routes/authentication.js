const express = require("express");
const route = express.Router();
const {
  getUsers,
  getSingUp,
  getSingIn,
} = require("../controllers/authentication");

route.get("/users", getUsers);
route.post("/singup", getSingUp);
route.post("/singin", getSingIn);

module.exports = route;

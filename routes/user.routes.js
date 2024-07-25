const express = require("express");
const { addUser } = require("../controllers/users.controller");
const route = express.Router();

route.post("/add", addUser);

module.exports = route;

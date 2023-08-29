const express = require("express");
const apiUser = require("../api/userHandlers");

const apiUserRouter = express.Router();

apiUserRouter.post("/login", apiUser.login);

module.exports = apiUserRouter;

const express = require("express");

const planetsRouter = express.Router();

// controllers
const { httpGetAllPlanets } = require("./planets.controller");

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;

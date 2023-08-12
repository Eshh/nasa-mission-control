const express = require("express");

const planetsRouter = express.Router();

// controllers
const { getAllPlanets } = require("./planets.controller");

planetsRouter.get("/", getAllPlanets);

module.exports = planetsRouter;

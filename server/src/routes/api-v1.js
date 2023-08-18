const express = require("express");
const app = express();
const api = express.Router();

const planetsRouter = require("./planets/planets.router");
const launchesRouter = require("./launches/launches.router");

api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;

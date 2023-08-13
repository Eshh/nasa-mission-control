const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortlaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortlaunch);

module.exports = launchesRouter;

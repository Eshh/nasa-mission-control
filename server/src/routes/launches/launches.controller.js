const {
  getAllLaunches,
  addNewLaunch,
  existsLaunch,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  // validation
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res
      .status(400)
      .json({ error: "Missing required Launch properties" });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (
    launch.launchDate.toString() === "Invalid date" ||
    isNaN(launch.launchDate)
  ) {
    return res.status(400).json({ error: "Invalid Launch date" });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortlaunch(req, res) {
  const launchId = +req.params.id;
  if (!existsLaunch(launchId))
    return res.status(404).json({ error: "Launch not found" });

  const abordtedLaunch = abortLaunchById(launchId);
  return res.status(200).json(abordtedLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortlaunch,
};

const {
  getAllLaunches,
  addNewLaunch,
  existsLaunch,
  abortLaunchById,
} = require("../../models/launches.model");

const { getPagination } = require("../../services/query.js");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  return res.status(200).json(await getAllLaunches(skip,limit));
}

async function httpAddNewLaunch(req, res) {
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
  await addNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortlaunch(req, res) {
  const launchId = +req.params.id;
  const exists = await existsLaunch(launchId);
  if (!exists) return res.status(404).json({ error: "Launch not found" });

  const aborted = await abortLaunchById(launchId);
  if (!aborted) return res.status(400).json({ error: "Abort failure" });
  return res.status(200).json({ ok: true });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortlaunch,
};

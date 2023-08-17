const { launchesModel } = require("./launches.mongo");
const planetsModel = require("./planets.mongo");
launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

function existsLaunch(id) {
  return launches.has(id);
}
async function getAllLaunches() {
  return await launchesModel.find({}, { _id: 0, __v: 0 });
}

async function addNewLaunch(launch) {
  const fnum = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["NASA", "spaceX"],
    flightNumber: +fnum,
  });
  await saveLaunch(newLaunch);
}

function abortLaunchById(id) {
  const aborted = launches.get(id);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

async function saveLaunch(launch) {
  const planet = await planetsModel.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No Planet found");
  }
  await launchesModel.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesModel.findOne({}).sort("-flightNumber");
  console.log(latestLaunch, "console");
  return latestLaunch.flightNumber || DEFAULT_FLIGHT_NUMBER;
}

module.exports = {
  existsLaunch,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};

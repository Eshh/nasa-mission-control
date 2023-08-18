const { launchesModel } = require("./launches.mongo");
const planetsModel = require("./planets.mongo");
launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunch(id) {
  return await launchesModel.findOne({ flightNumber: id });
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

async function abortLaunchById(id) {
  const aborted = await launchesModel.updateOne(
    { flightNumber: id },
    { upcoming: false, sucess: false }
  );
  return aborted.modifiedCount == 1;
}

async function saveLaunch(launch) {
  const planet = await planetsModel.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No Planet found");
  }
  await launchesModel.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesModel.findOne({}).sort("-flightNumber");
  return latestLaunch.flightNumber || DEFAULT_FLIGHT_NUMBER;
}

module.exports = {
  existsLaunch,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};

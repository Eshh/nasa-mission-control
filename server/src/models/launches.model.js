const axios = require("axios");

const { launchesModel } = require("./launches.mongo");
const planetsModel = require("./planets.mongo");
launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunch(id) {
  return await findLaunch({ flightNumber: id });
}
async function getAllLaunches() {
  return await launchesModel.find({}, { _id: 0, __v: 0 });
}

async function addNewLaunch(launch) {
  const planet = await planetsModel.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No Planet found");
  }
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

async function findLaunch(filter) {
  return await launchesModel.findOne(filter);
}

const SPACEX_API_URL = `https://api.spacexdata.com/v4/launches/query`;
async function loadSpacexLaunches() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) return;
  await populateLaunches();
}
async function populateLaunches() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  if (response.status != 200) {
    console.log("Problem downloading Launch data");
    throw new Error("Downloading launches failed");
  }
  const launchDocs = response.data.docs;
  launchDocs.forEach(async (each) => {
    const launch = {
      flightNumber: each.flight_number,
      mission: each.name,
      rocket: each.rocket.name,
      launchDate: each.date_local,
      upcoming: each.upcoming,
      success: each.success,
      customers: each.payloads.flatMap((p) => p.customers),
    };
    await saveLaunch(launch);
  });
}

module.exports = {
  existsLaunch,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  loadSpacexLaunches,
};

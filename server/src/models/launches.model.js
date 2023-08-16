const { launchesModel } = require("./launches.mongo");
let latestFlightNumber = 100;
launches = new Map();

function existsLaunch(id) {
  console.log(launches.has(id));
  return launches.has(id);
}
async function getAllLaunches() {
  return await launchesModel.find({}, { _id: 0, __v: 0 });
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launch.flightNumber = latestFlightNumber;
  saveLaunch(launch);
  // launches.set(
  //   latestFlightNumber,
  //   Object.assign(launch, {
  //     flightNumber: latestFlightNumber,
  //     customers: ["SpaceX", "NASA"],
  //     upcoming: true,
  //     success: true,
  //   })
  // );
}

function abortLaunchById(id) {
  const aborted = launches.get(id);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

async function saveLaunch(launch) {
  await launchesModel.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

module.exports = {
  existsLaunch,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};

const launches = new Map();
let latestFlightNumber = 100;

function existsLaunch(id) {
  console.log(launches.has(id));
  return launches.has(id);
}
function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["SpaceX", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(id) {
  const aborted = launches.get(id);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

module.exports = {
  existsLaunch,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};

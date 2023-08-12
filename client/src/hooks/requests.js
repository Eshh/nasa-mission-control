const API_BASE_URL = "http://localhost:5000";

async function httpGetPlanets() {
  // Load planets and return as JSON.
  const planets = await (await fetch(`${API_BASE_URL}/planets`)).json();
  return planets;
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  let launches = await (await fetch(`${API_BASE_URL}/launches`)).json();
  launches = launches.sort((a, b) => a.flightNumber - b.flightNumber);
  return launches;
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

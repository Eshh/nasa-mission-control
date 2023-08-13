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
  // Submit given launch data to launch system.
  try {
    return await fetch(`${API_BASE_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    return await fetch(`${API_BASE_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch {
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

// package imports
const http = require("http");

// custom imports
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model.js");
const { loadSpacexLaunches } = require("./models/launches.model.js");
const { connectToMongo } = require("./services/mongo.js");
// global variables
const PORT = process.env.PORT || 5000;

// server init
const server = http.createServer(app);

// server spin
async function startServer() {
  await connectToMongo();
  await loadPlanetsData();
  await loadSpacexLaunches();
  server.listen(PORT, () => console.log(`Node server listening on ${PORT}`));
}

startServer();

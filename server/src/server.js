// package imports
const http = require("http");
const mongoose = require("mongoose");
// custom imports
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
// global variables
const PORT = process.env.PORT || 5000;

// MONGO
const MONGO_URL =
  "mongodb+srv://nasa-api:katyperry@nasa-cluster.gh0t5sr.mongodb.net/nasa-mission?retryWrites=true&w=majority";

mongoose.connection.once("open", () => console.log("Mongoose connected"));
mongoose.connection.on("error", (e) => console.error("Connecttion error", e));
// server init
const server = http.createServer(app);

// server spin
async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, () => console.log(`Node server listening on ${PORT}`));
}

startServer();

const { mongoose } = require("mongoose");
// MONGO
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => console.log("Mongoose connected"));
mongoose.connection.on("error", (e) => console.error("Connecttion error", e));

async function connectToMongo() {
  await mongoose.connect(MONGO_URL);
}

async function disconnectMongo() {
  await mongoose.disconnect();
}

module.exports = {
  connectToMongo,
  disconnectMongo,
};

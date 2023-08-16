const { parse } = require("csv-parse");
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const planetsModel = require("./planets.mongo");

// const habitablePlanets = [];

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler-data.csv")
    )
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", async (res) => {
        if (isHabitablePlanet(res)) {
          // habitablePlanets.push(res);
          savePlanet(res);
        }
      })
      .on("end", async () => {
        const planetsFound = (await getAllPlanets()).length;
        console.log(`${planetsFound} habitable planets found`);
        resolve();
      })
      .on("error", (err) => reject(err));
  });
}

function isHabitablePlanet(planet) {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
}

async function getAllPlanets() {
  return await planetsModel.find({});
}

async function savePlanet(planet) {
  try {
    await planetsModel.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (e) {
    console.error("Could not save", e);
  }
}

module.exports = { loadPlanetsData, getAllPlanets };

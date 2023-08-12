const { parse } = require("csv-parse");
const fs = require("fs");
const { request } = require("http");
const path = require("path");

const promise = new Promise((resolve, reject) => {});

const habitablePlanets = [];

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler-data.csv")
    )
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", (res) =>
        isHabitablePlanet(res) ? habitablePlanets.push(res) : false
      )
      .on("end", () => {
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

module.exports = { loadPlanetsData, planets: habitablePlanets };

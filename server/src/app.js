const express = require("express");
const cors = require("cors");
const path = require("path");

//router groups
const planetsRouter = require("./routes/planets/planets.router");

const app = express();

// middleware to convert requests data to json before passing to route handlers
app.use(express.json());
// static site middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cors({ origin: "http://localhost:3000" }));
// end point handlers
app.use("/planets", planetsRouter);
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);

module.exports = app;

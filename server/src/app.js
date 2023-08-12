const express = require("express");
const cors = require("cors");

//router groups
const planetsRouter = require("./routes/planets/planets.router");

const app = express();
// middleware to convert requests data to json before passing to route handlers
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
// end point handlers
app.use("/planets", planetsRouter);

module.exports = app;

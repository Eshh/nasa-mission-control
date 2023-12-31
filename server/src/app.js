const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

//router groups
const api = require("./routes/api-v1");

const app = express();

// cors bypasser
app.use(cors({ origin: "http://localhost:3000" }));

// logger - Morgan package
app.use(morgan("combined"));

// middleware to convert requests data to json before passing to route handlers
app.use(express.json());

// static site middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// end point handlers
app.use("/v1", api);
// client end
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);

module.exports = app;

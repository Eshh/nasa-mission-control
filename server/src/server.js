// package imports
const http = require("http");
// custom imports
const app = require("./app");

// global variables
const PORT = process.env.PORT || 5000;

// server init
const server = http.createServer(app);

// server spin
server.listen(PORT, () => console.log(`Node server listening on ${PORT}`));

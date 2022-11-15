const express = require("express");
const app = express();
const port = 4000;

const io = require("socket.io-client");
const socket = io("ws://localhost:3513");

socket.on("message", (coordinates) => {
  console.log(coordinates);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`))

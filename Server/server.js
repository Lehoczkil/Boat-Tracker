//use .env for storing environment variables
require("dotenv").config();
//use quries to communicate with database
const db = require('./queries')

const express = require("express");
const app = express();

let boat1CurrentCoordinates = null;
let boat2CurrentCoordinates = null;
let boat3CurrentCoordinates = null;

// port for http for requests for changing protocol
const httpPort = 3513;
// port for socket for sending data
const port = 3100;

// makes the server a client of a mock application sending data
const io = require("socket.io-client");
const socket = io("ws://localhost:8080");

// deals with the data coming from the mock application
socket.on("boat1", (coordinates) => {
  boat1CurrentCoordinates = coordinates;
});
socket.on("boat2", (coordinates) => {
  boat2CurrentCoordinates = coordinates;
});
socket.on("boat3", (coordinates) => {
  boat3CurrentCoordinates = coordinates;
});

// server for the actual clients, sends the data to them
const httpServer = require("http").createServer();
const serverIo = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});

const frequency = 1000;
let isSending = false;

async function sendData() {
  while (true) {
    serverIo.emit("boat1", boat1CurrentCoordinates);
    serverIo.emit("boat2", boat2CurrentCoordinates);
    serverIo.emit("boat3", boat3CurrentCoordinates);
    // waits for an amount of time to prevent sending data constantly
    await new Promise((resolve) => setTimeout(resolve, frequency));
  }
}

serverIo.on("connection", () => {
  console.log("new connection");
  // if there is a connection, we are already sending the data, so we shouldn't start sending again on a new connection
  if (!isSending) {
    sendData();
  }
  isSending = true;
});

httpServer.listen(httpPort, () =>
  console.log(`listening on http://localhost:${port}`)
);
app.listen(port);

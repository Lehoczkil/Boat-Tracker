//use .env for storing environment variables
require("dotenv").config();
//use quries to communicate with database
const db = require("./queries");

const express = require("express");
const app = express();

let boat1CurrentCoordinates = null;
let boat2CurrentCoordinates = null;
let boat3CurrentCoordinates = null;

let boat1CurrentRecording = [];
let boat2CurrentRecording = [];
let boat3CurrentRecording = [];

// check if a client is currently recording
let isRecording = false;

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
  handleRecordings();
  while (true) {
    serverIo.emit("boat1", boat1CurrentCoordinates);
    serverIo.emit("boat2", boat2CurrentCoordinates);
    serverIo.emit("boat3", boat3CurrentCoordinates);
    // waits for an amount of time to prevent sending data constantly
    await new Promise((resolve) => setTimeout(resolve, frequency));
  }
}

// Handle storing current recording before sending to database
async function handleRecordings() {
  while (true) {
    if (isRecording) {
      if (
        boat1CurrentRecording.length === 0 ||
        (boat1CurrentRecording.length > 0 &&
          [boat1CurrentCoordinates.lon, boat1CurrentCoordinates.lat] !==
            boat1CurrentRecording[-1])
      ) {
        boat1CurrentRecording.push([
          boat1CurrentCoordinates.lon,
          boat1CurrentCoordinates.lat,
        ]);
      }

      if (
        boat2CurrentRecording.length === 0 ||
        (boat2CurrentRecording.length > 0 &&
          [boat2CurrentCoordinates.lon, boat2CurrentCoordinates.lat] !==
            boat2CurrentRecording[-1])
      ) {
        boat2CurrentRecording.push([
          boat2CurrentCoordinates.lon,
          boat2CurrentCoordinates.lat,
        ]);
      }

      if (
        boat3CurrentRecording.length === 0 ||
        (boat3CurrentRecording.length > 0 &&
          [boat3CurrentCoordinates.lon, boat3CurrentCoordinates.lat] !==
            boat3CurrentRecording[-1])
      ) {
        boat3CurrentRecording.push([
          boat3CurrentCoordinates.lon,
          boat3CurrentCoordinates.lat,
        ]);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, frequency - 10));
  }
}

// Puts the current recording into the database
function pushRecordToDB() {
  let currentRecording = [
    boat1CurrentRecording,
    boat2CurrentRecording,
    boat3CurrentRecording,
  ];

  console.log('push');

  boat1CurrentRecording = [];
  boat2CurrentRecording = [];
  boat3CurrentRecording = [];

  db.addRecording(currentRecording);
}

// Sends the previous recordings to the clients
async function sendRecordings() {
  const recordings = await db.getRecordings();
  serverIo.emit('recordings', recordings);
}

serverIo.on("connection", (socket) => {
  console.log("new connection");
  // if there is a connection, we are already sending the data, so we shouldn't start sending again on a new connection
  if (!isSending) {
    sendData();
  }
  isSending = true;

  sendRecordings();

  // Handles messages coming from clients
  socket.on("message", (message) => {
    if (message === "start") {
      console.log("A client is started to record");
      isRecording = true;
    } else if (message === "stop") {
      console.log("A client is stopped the recording");
      isRecording = false;
      pushRecordToDB();
    }
  });
});

httpServer.listen(httpPort, () =>
  console.log(`listening on http://localhost:${port}`)
);
app.listen(port);

const express = require("express");
const app = express();
let currentCoordinates = null;
const httpPort = 3513;
const port = 3000;

// makes the server a client of a mock application sending data
const io = require("socket.io-client");
const socket = io("ws://localhost:8080");

// deals with the data coming from the mock application
socket.on("message", (text) => {
  console.log("this is one row");
  console.log(text);
  currentCoordinates = text;
});

// server for the actual clients, sends the data to them
const httpServer = require("http").createServer();
const serverIo = require("socket.io")(httpServer, {
    cors: { origin: "*" }
});

serverIo.on("connection", () => {
    console.log('a user connected to express');
    setInterval(() => {
      serverIo.send(currentCoordinates)
    }, 1000)
});

httpServer.listen(httpPort, () => console.log(`listening on http://localhost:${port}`) );
app.listen(port);

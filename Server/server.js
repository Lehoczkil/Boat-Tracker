const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

const io = require("socket.io-client");
const socket = io("ws://localhost:8080");

socket.on("message", (text) => {
  console.log("this is one data");
  console.log(text);
});

app.listen(3000);

const http = require("http").createServer();
const csv = require("csvtojson");

const port = 8080;
const frequency = 1000;

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

let coordinates1,
  coordinates2,
  coordinates3 = null;

async function convertCoordinates() {
  coordinates1 = await csv().fromFile("./lines/line1.csv");
  coordinates2 = await csv().fromFile("./lines/line2.csv");
  coordinates3 = await csv().fromFile("./lines/line3.csv");
}

async function sendCoordinates(data, boat) {
  for (row of data) {
    io.emit(boat, row);
    await new Promise((resolve) => setTimeout(resolve, frequency));
  }
}

async function startSendingCoordinates() {
  await convertCoordinates();
  sendCoordinates(coordinates1, "boat1");
  sendCoordinates(coordinates2, "boat2");
  sendCoordinates(coordinates3, "boat3");
}

io.on("connection", async () => {
  console.log("a user connected");
  await startSendingCoordinates();
});

http.listen(port, () => console.log(`listening on http://localhost:${port}`));

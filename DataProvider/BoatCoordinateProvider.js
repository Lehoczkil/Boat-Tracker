const http = require("http").createServer();
const csv = require("csvtojson");

const port = 8080;
// The amount of time the application will wait
const frequency = 1000;

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

let coordinates1,
  coordinates2,
  coordinates3 = null;

// Converts the csv files to json format
async function convertCoordinates() {
  coordinates1 = await csv().fromFile("./lines/line1.csv");
  coordinates2 = await csv().fromFile("./lines/line2.csv");
  coordinates3 = await csv().fromFile("./lines/line3.csv");
}

// Sends a boats coordinates to the express server
async function sendCoordinates(data, boat) {
  for (row of data) {
    io.emit(boat, row);
    // waits for an amunt of time before sending the next row
    await new Promise((resolve) => setTimeout(resolve, frequency));
  }
}

// Sends all boats data to the express server
async function startSendingCoordinates() {
  await convertCoordinates();
  sendCoordinates(coordinates1, "boat1");
  sendCoordinates(coordinates2, "boat2");
  sendCoordinates(coordinates3, "boat3");
}

// Starts sending the data immediately after the express server is connected
io.on("connection", async () => {
  console.log("a user connected");
  await startSendingCoordinates();
});

http.listen(port, () => console.log(`listening on http://localhost:${port}`));

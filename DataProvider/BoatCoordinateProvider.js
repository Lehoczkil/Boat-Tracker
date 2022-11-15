const http = require('http').createServer();
const csv = require("csvtojson");

const port = 8080;
const frequency = 1000;

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let coordinates1, coordinates2, coordinates3 = null;

async function convertCoordinates() {
    coordinates1 = await csv().fromFile("./lines/line1.csv")
    coordinates2 = await csv().fromFile("./lines/line2.csv")
    coordinates3 = await csv().fromFile("./lines/line3.csv")
}

async function start_sending_coordinates() {
    await convertCoordinates();
    coordinates = [coordinates1, coordinates2, coordinates3];
    for (coordinate_table of coordinates) {
        for (coordinate_row of coordinate_table) {
            io.send(coordinate_row)
            await new Promise(resolve => setTimeout(resolve, frequency));
        }
    }
}

io.on('connection', async (socket) => {
    console.log('a user connected');
    await start_sending_coordinates()
});

http.listen(port, () => console.log(`listening on http://localhost:${port}`) );

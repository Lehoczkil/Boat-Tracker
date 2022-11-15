const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const csv = require("csvtojson");

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
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

io.on('connection', async (socket) => {
    console.log('a user connected');
    await start_sending_coordinates()
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );

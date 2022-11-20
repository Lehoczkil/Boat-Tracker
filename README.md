# Norbit-homework-sonar
This Project is homework for Norbit's job interview.
## Installation

Use npm install to download the needed dependencies.

```bash
npm install
```

## Usage

Download the dependencies in react-client, Server and DataProvider
```bash
npm install
```

Create a .env file for storing your API key for getting a map and information for your database

Create a database

Run the SQL file

```
\c database_name
\i path_to_the_sql_file
```
Now you are ready
## Task

1. Create a simple mock application:
- Streams boat position data to connected clients over WebSocket protocol in JSON format.
- Position data sample records are given CSV format (latitude, longitude, heading). 
- The program may terminate at the end of the record. 
- Data shall be streamed at a 1 Hz rate.

2. Set up a PostgreSQL database:
- Store boat position and any other necessary data.
- Create stored procedures to be able to save data and views for retrieving data.

3. Implement an express.js server application:
- Connects to the mock application and listens to boat position data.
- The server can interact with the database. 
- The server shall support handling any number of clients and update their states over socket.io in real-time.

4. Create a client application:
- Use OpenLayers to display the real-time position of the boat on a map view.
- Use any simple symbol to visualize the boat e.g., an acute isosceles triangle. 
- Reflect the heading direction when displaying the symbol. 
- Offer the possibility of recording a track with a start/stop button. 
- During ongoing recording, display the track in red color by simply connecting the position samples with straight lines.
- Synchronize the state of the start/stop button and the display of the currently recorded track between clients.
- Consider newly connected clients during a recording.
- Start/stop actions can be initiated from any of the clients. 
- Implement a list of all previously recorded tracks ordered and named by start time.
- The user can select any single track from the list and activate visualization on the map in black color.

## Technologies
- React
- Express JS
- Node JS
- OpenLayers

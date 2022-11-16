# Norbit-homework-sonar

## Task:

1. Create a simple mock application:
- Streams boat position data to connected clients over WebSocket protocol in JSON format.
- Position data sample records are given csv format (latitude, longitude, heading). 
- The program may terminate at the end of the record. 
- Data shall be streamed at 1 Hz rate.

2. Set up a PostgreSQL database:
- Store boat position and any other necessary data.
- Create stored procedures to be able to save data and views to retrieve data.

3. Implement an express.js server application:
- Connects to the mock application and listens to boat position data.
- The server can interact with the database. 
- The server shall support handling any number of clients and update their states over socket.io in real time.

4. Create a client application:
- Use OpenLayers to display the real time position of the boat on a map view.
- Use any simple symbol to visualize the boat e.g., an acute isosceles triangle. 
- Reflect the heading direction when displaying the symbol. 
- Offer the possibility of recording a track by a start/stop button. 
- During ongoing recording, display the track in red color by simply connecting the position samples with straight lines.
- Synchronize the state of start/stop button and the display of the currently recorded track between clients.
- Consider newly connected clients during a recording.
- Start/stop actions can be initiated from any of the clients. 
- Implement a list of all previously recorded tracks ordered and named by start time.
- The user can select any single track from the list and activate visualization on the map in black color.

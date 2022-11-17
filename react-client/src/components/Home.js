import React, { useState, useEffect } from "react";
import { useGeographic } from "ol/proj";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";

const Home = ({ socket }) => {
  const [boat1Coordinates, setBoat1Coordinates] = useState("");
  const [boat2Coordinates, setBoat2Coordinates] = useState("");
  const [boat3Coordinates, setBoat3Coordinates] = useState("");

  const [map, setMap] = useState();

  useGeographic();

  useEffect(() => {
    setMap(
      new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=14c7611bde4c4982ac1c45ec8b5d80ba",
            }),
          }),
        ],
        view: new View({
          center: [boat1Coordinates.lat, boat1Coordinates.lon],
          zoom: 16,
        }),
      })
    );
  }, []);

  useEffect(() => {
    if (map) {
      map.getView().setCenter([boat1Coordinates.lon, boat1Coordinates.lat]);
    }
  }, [boat1Coordinates, boat2Coordinates, boat3Coordinates]);

  useEffect(() => {
    socket.on("boat1", (newCoordinates) => {
      setBoat1Coordinates(newCoordinates);
    });
    
    socket.on("boat2", (newCoordinates) => {
      setBoat2Coordinates(newCoordinates);
    });
    
    socket.on("boat3", (newCoordinates) => {
      setBoat3Coordinates(newCoordinates);
    });
  }, []);

  return <div id="map" className="map" />;
};

export default Home;

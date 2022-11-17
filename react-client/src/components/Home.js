import React, { useState, useEffect } from "react";
import { useGeographic } from "ol/proj";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";

const Home = ({ socket }) => {
  const [coordinates, setCoordinates] = useState("");

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
          center: [coordinates.lat, coordinates.lon],
          zoom: 20,
        }),
      })
    );
  }, []);

  useEffect(() => {
    if (map) {
      map.getView().setCenter([coordinates.lat, coordinates.lon]);
    }
  }, [coordinates]);

  useEffect(() => {
    socket.on("message", (newCoordinates) => {
      setCoordinates(newCoordinates);
    });
  }, []);

  return <div id="map" className="map" />;
};

export default Home;

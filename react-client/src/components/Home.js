import React, { useState, useEffect } from "react";
import { useGeographic } from "ol/proj";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import logo from "./arrow.png";
import Controls from "./Controls";

const Home = ({ socket }) => {

  const API_KEY = process.env.REACT_APP_API_KEY;

  const [boat1Coordinates, setBoat1Coordinates] = useState("");
  const [boat2Coordinates, setBoat2Coordinates] = useState("");
  const [boat3Coordinates, setBoat3Coordinates] = useState("");

  const [map, setMap] = useState();

  const [boat1, setBoat1] = useState();
  const [boat2, setBoat2] = useState();
  const [boat3, setBoat3] = useState();

  const startingCoordinates = [20.73976894, 48.21548097];

  useGeographic();

  useEffect(() => {
    setBoat1(
      new Feature({
        geometry: new Point(startingCoordinates),
        style: new Style({
          image: new Icon({
            anchor: [0, 0],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: logo,
            scale: 0.1,
          }),
        }),
      })
    );

    setBoat2(
      new Feature({
        geometry: new Point(startingCoordinates),
        style: new Style({
          image: new Icon({
            anchor: [0, 0],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: logo,
            scale: 0.1,
          }),
        }),
      })
    );

    setBoat3(
      new Feature({
        geometry: new Point(startingCoordinates),
        style: new Style({
          image: new Icon({
            anchor: [0, 0],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: logo,
            scale: 0.1,
          }),
        }),
      })
    );
  }, []);

  useEffect(() => {
    if ((boat1, boat2, boat3)) {
      setMap(
        new Map({
          target: "map",
          layers: [
            new TileLayer({
              source: new XYZ({
                url: `https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${API_KEY}`,
              }),
            }),
            new VectorLayer({
              source: new VectorSource({
                features: [boat1, boat2, boat3],
              }),
            }),
          ],
          view: new View({
            center: startingCoordinates,
            zoom: 16,
          }),
        })
      );
    }
  }, [boat3]);

  useEffect(() => {
    if (boat1) {
      boat1
        .getGeometry()
        .setCoordinates([boat1Coordinates.lon, boat1Coordinates.lat]);
    }
  }, [boat1Coordinates]);

  useEffect(() => {
    if (boat2) {
      boat2
        .getGeometry()
        .setCoordinates([boat2Coordinates.lon, boat2Coordinates.lat]);
    }
  }, [boat2Coordinates]);

  useEffect(() => {
    if (boat3) {
      boat3
        .getGeometry()
        .setCoordinates([boat3Coordinates.lon, boat3Coordinates.lat]);
    }
  }, [boat3Coordinates]);

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

  return (
    <>
      <div id="map" className="map" />
      <Controls 
        boat1={boat1Coordinates}
        boat2={boat2Coordinates}
        boat3={boat3Coordinates}
      />
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";

const Home = ({ socket  }) => {
  
    const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    let rotationInterval = setTimeout( () => {
        socket.on("message", (newCoordinates) => {
            setCoordinates(newCoordinates);
        });
    }, 1000);
  }, []);

  return (
    <>
      <h1>{coordinates.lat}</h1>
      <h1>{coordinates.lon}</h1>
      <h1>{coordinates.heading}</h1>
    </>
  );
};

export default Home;

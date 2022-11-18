const Controls = ({ boat1, boat2, boat3 }) => {
  return (
    <div className="controls">
      <div className="positions">
        <div classname="boat-container">
          <h3>Boat 1</h3>
          <p>Lat: {boat1.lat}</p>
          <p>Lon: {boat1.lon}</p>
          <p>Heading:{boat1.heading}</p>
        </div>

        <div classname="boat-container">
          <h3>Boat 2</h3>
          <p>Lat: {boat2.lat}</p>
          <p>Lon: {boat2.lon}</p>
          <p>Heading: {boat2.heading}</p>
        </div>

        <div classname="boat-container">
          <h3>Boat 3</h3>
          <p>Lat: {boat3.lat}</p>
          <p>Lon: {boat3.lon}</p>
          <p>Heading: {boat3.heading}</p>
        </div>
      </div>
      <div className="record-panel">
        <button>Start</button>
        <button>Stop</button>
      </div>
    </div>
  );
};

export default Controls;

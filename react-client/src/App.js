import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./components/Home";

// Connects to express server
const socket = io.connect("http://localhost:3513");

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={
          <Home 
            socket={socket}
          />
          }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

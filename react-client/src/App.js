import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import io from "socket.io-client";
import Home from "./components/Home";

const socket = io.connect("http://localhost:3513");

function App() {

  return (
    <BrowserRouter>
      <div>
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

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Alarm from "./screens/Alarm.jsx";
import Clock from "./screens/Clock.jsx";
import Timer from "./screens/Timers.jsx";
import Stopwatch from "./screens/Stopwatch.jsx";
import NotFound from "./screens/NotFound.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} exact />
        <Route path="/*" element={<NotFound />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

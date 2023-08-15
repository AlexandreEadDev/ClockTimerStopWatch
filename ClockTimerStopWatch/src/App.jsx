import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/alarm">Alarm</Link>
          </li>
          <li>
            <Link to="/clock">Clock</Link>
          </li>
          <li>
            <Link to="/timer">Timer</Link>
          </li>
          <li>
            <Link to="/stopwatch">Stopwatch</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import ClockAnim from "./assets/clockAnim.gif";

function App() {
  return (
    <div className="overflow-hidden flex flex-col items-center">
      <div className=" flex mt-40 items-end justify-center text-8xl text-[#ffa351ff]  font-bold font-sans">
        <Link
          className=" font-bright hover:text-[#fcda7c] duration-300"
          to="/alarm"
        >
          Clock
        </Link>
      </div>
      <img
        className=" mt-12 flex justify-center max-w-[250px]"
        src={ClockAnim}
      />
      <nav className="  flex mt-20 justify-center">
        <ul className="  font-bright text-5xl flex space-x-60 text-[#ffa351ff] font-bold">
          <li className="hover:text-[#fcda7c] duration-300">
            <Link to="/clock">Alarm</Link>
          </li>
          <li className=" translate-x-[-1rem] mt-20 hover:text-[#fcda7c] duration-300">
            <Link to="/stopwatch">Stopwatch</Link>
          </li>
          <li className="hover:text-[#fcda7c] duration-300">
            <Link to="/timer">Timer</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;

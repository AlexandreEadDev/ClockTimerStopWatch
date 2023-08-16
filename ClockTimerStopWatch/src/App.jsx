import React from "react";
import { Link } from "react-router-dom";
import ClockAnim from "./assets/clockAnim.gif";

function App() {
  return (
    <div className="overflow-hidden flex flex-col items-center h-screen">
      <div className=" flex mt-40 items-end justify-center text-8xl text-[#ffa351ff]">
        <Link className=" font-bright hover:scale-110 duration-300" to="/clock">
          Clock
        </Link>
      </div>
      <img
        className=" mt-12 flex justify-center max-w-[250px]"
        src={ClockAnim}
      />
      <nav className=" flex mt-20 justify-center w-screen">
        <ul className=" font-bright text-5xl flex space-x-60 text-[#fcda7c] font-bold">
          <li className=" hover:scale-110 duration-300">
            <Link to="/alarm">Alarm</Link>
          </li>
          <li className=" translate-x-[-1rem] mt-20 hover:scale-110 duration-300">
            <Link to="/stopwatch">Stopwatch</Link>
          </li>
          <li className="hover:scale-110 duration-300">
            <Link to="/timer">Timer</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;

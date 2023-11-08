import React from "react";
import { Link } from "react-router-dom";
import ClockAnim from "./assets/clockAnim.gif";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex mt-10 md:mt-20 items-center flex-col text-4xl md:text-8xl text-[#ffa351ff]">
        <Link className="font-bright hover:scale-110 duration-300" to="/clock">
          Clock
        </Link>
      </div>
      <img
        className="mt-6 md:mt-12 flex justify-center max-w-[200px] md:max-w-[250px]"
        src={ClockAnim}
        alt="Clock Animation"
      />
      <nav className="flex mt-10 md:mt-20 justify-center w-screen ">
        <ul className="font-bright gap-20 text-3xl md:text-5xl flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-20 text-[#fcda7c] font-bold">
          <li className="hover:scale-110 duration-300">
            <Link to="/alarm">Alarm</Link>
          </li>
          <li className="hover:scale-110 duration-300 md:translate-y-20">
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

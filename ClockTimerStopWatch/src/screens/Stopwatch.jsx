import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Stopwatch = () => {
  const [times, setTimes] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [hrDotRotation, setHrDotRotation] = useState(0);
  const [minDotRotation, setMinDotRotation] = useState(0);
  const [secDotRotation, setSecDotRotation] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (time) => (time < 10 ? "0" + time : time);

  const start = () => {
    if (!intervalId) {
      const newIntervalId = setInterval(() => {
        setTimes((prevTimes) => prevTimes + 1);
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const stop = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const reset = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTimes(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    const h = Math.floor(times / 3600);
    const m = Math.floor((times - h * 3600) / 60);
    const s = times % 60;

    setHrDotRotation(h * 15);
    setMinDotRotation(m * 6);
    setSecDotRotation(s * 6);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  }, [times]);

  return (
    <div>
      <header>
        <Link to="/">
          <i className="fa-solid fa-angle-left absolute mt-14 ml-14 hover:scale-125 duration-300 text-3xl text-[#fcda7c]"></i>
        </Link>
      </header>
      <main className=" flex justify-center items-center min-h-screen flex-col ">
        <div
          id="time"
          className=" duration-700 absolute flex justify-center gap-40 text-white w-full mb-4 "
        >
          {/* First Circle */}
          <div className="circle" style={{ "--clr": "#ffa351ff" }}>
            <div
              className="dots hr_dot"
              style={{ transform: `rotate(${hrDotRotation}deg)` }}
            ></div>
            <svg className="w-150 h-150">
              <circle cx="70" cy="70" r="70"></circle>
              <circle
                cx="70"
                cy="70"
                r="70"
                style={{ strokeDashoffset: 440 - (440 * hours) / 24 }}
              ></circle>
            </svg>
            <div className="absolute text-center font-weight-500 text-1.5em transform -translate-y-10">
              {formatTime(hours)}
              <br />
              <span>Hours</span>
            </div>
          </div>
          {/* Second Circle */}
          <div className="circle" style={{ "--clr": "#ffbe7bff" }}>
            <div
              className="dots min_dot"
              style={{ transform: `rotate(${minDotRotation}deg)` }}
            ></div>
            <svg className="w-150 h-150">
              <circle cx="70" cy="70" r="70"></circle>
              <circle
                cx="70"
                cy="70"
                r="70"
                style={{ strokeDashoffset: 440 - (440 * minutes) / 60 }}
              ></circle>
            </svg>
            <div className="absolute text-center font-weight-500 text-1.5em transform -translate-y-10">
              {formatTime(minutes)}
              <br />
              <span>Minutes</span>
            </div>
          </div>
          {/* Third Circle */}
          <div className="circle" style={{ "--clr": "#eed971ff" }}>
            <div
              className="dots sec_dot"
              style={{ transform: `rotate(${secDotRotation}deg)` }}
            ></div>
            <svg className="w-150 h-150">
              <circle cx="70" cy="70" r="70"></circle>
              <circle
                cx="70"
                cy="70"
                r="70"
                style={{ strokeDashoffset: 440 - (440 * seconds) / 60 }}
              ></circle>
            </svg>
            <div className="absolute text-center font-weight-500 text-1.5em transform -translate-y-10">
              {formatTime(seconds)}
              <br />
              <span>Seconds</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls absolute mt-96 flex justify-center gap-20 text-white w-full mb-4 text-xl ">
          <div onClick={start} className=" cursor-pointer">
            Start
          </div>
          <div onClick={stop} className=" cursor-pointer">
            Stop
          </div>
          <div onClick={reset} className=" cursor-pointer">
            Reset
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stopwatch;

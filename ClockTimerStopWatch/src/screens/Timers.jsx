import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import alarm from "../assets/alarm.mp3";

function Timers() {
  const [timer, setTimer] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hrDotRotation, setHrDotRotation] = useState(0);
  const [minDotRotation, setMinDotRotation] = useState(0);
  const [secDotRotation, setSecDotRotation] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const inputTimeRef = useRef(null);
  const [ringtone, setRingtone] = useState(new Audio(alarm));

  useEffect(() => {
    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds - h * 3600) / 60);
    const s = remainingSeconds % 60;

    setHrDotRotation(h * 15);
    setMinDotRotation(m * 6);
    setSecDotRotation(s * 6);
    setHours(h);
    setMinutes(m);
    setSeconds(s);

    if (remainingSeconds === 0 && isRunning) {
      clearInterval(intervalId);
      ringtone.play();
      ringtone.loop = true;
      setIsRunning(false);
    }
  }, [remainingSeconds, isRunning]);

  const stopTimerAndAlarm = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    ringtone.pause();
    ringtone.currentTime = 0;
  };

  useEffect(() => {
    const totalSeconds =
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(seconds, 10);
    setTimer(totalSeconds);
    setRemainingSeconds(totalSeconds);
  }, [hours, minutes, seconds]);

  const handlePlayPause = () => {
    if (isRunning) {
      stopTimerAndAlarm();
      clearInterval(intervalId);
    } else {
      setIsRunning(true);
      setRemainingSeconds(timer);
      const id = setInterval(() => {
        setRemainingSeconds((prevRemainingSeconds) => {
          if (prevRemainingSeconds > 0) {
            const h = Math.floor(prevRemainingSeconds / 3600);
            const m = Math.floor((prevRemainingSeconds - h * 3600) / 60);
            const s = prevRemainingSeconds % 60;

            setHours(h);
            setMinutes(m);
            setSeconds(s);

            return prevRemainingSeconds - 1;
          }
        });
      }, 1000);
      setIntervalId(id);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setRemainingSeconds(0);
    clearInterval(intervalId);

    // Reset the input field value
    inputTimeRef.current.value = "00:00:00";

    ringtone.pause();
    ringtone.currentTime = 0;
  };
  return (
    <div>
      <header>
        <Link to="/">
          <i className="fa-solid fa-angle-left absolute mt-14 ml-14 hover:scale-125 duration-300 text-3xl text-[#fcda7c]"></i>
        </Link>
      </header>
      <main className=" flex justify-center items-center min-h-screen flex-col gap-12">
        <div
          id="time"
          className=" -translate-y-20 absolute flex gap-2 md:gap-28 text-white"
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
              {hours}
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
              {minutes}
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
              {seconds}
              <br />
              <span>Seconds</span>
            </div>
          </div>
        </div>

        <div className=" gap-4 input-time-wrapper mt-60 flex flex-col justify-center w-52 text-gray-300">
          <input
            ref={inputTimeRef}
            className={` text-[#ffa351ff] flex items-center justify-center text-3xl bg-[#201e20] p-1 rounded-md duration-700 outline-none ${
              isRunning ? " opacity-50 pointer-events-none" : " cursor-pointer"
            }`}
            type="time"
            step="1"
            defaultValue="00:00:00"
            onChange={(e) => {
              const [inputHours, inputMinutes, inputSeconds] =
                e.target.value.split(":");
              const totalSeconds =
                parseInt(inputHours, 10) * 3600 +
                parseInt(inputMinutes, 10) * 60 +
                parseInt(inputSeconds, 10);
              setTimer(totalSeconds);
              setHours(parseInt(inputHours, 10));
              setMinutes(parseInt(inputMinutes, 10));
              setSeconds(parseInt(inputSeconds, 10));
            }}
          />
        </div>
        <div className="controls text-white text-2xl flex gap-20">
          <div
            className={`timer-btn timer-btn-control timer-btn-start cursor-pointer ${
              isRunning ? "running" : ""
            }`}
            onClick={handlePlayPause}
          >
            <i
              className={`fa ${isRunning ? "fa-pause" : "fa-play"}`}
              id="start"
            ></i>
          </div>
          <div className="timer-btn timer-btn-reset" onClick={handleReset}>
            <i className="fa fa-times" id="reset"></i>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Timers;

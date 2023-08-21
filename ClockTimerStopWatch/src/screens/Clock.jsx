import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Clock() {
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [hrDotRotation, setHrDotRotation] = useState(0);
  const [minDotRotation, setMinDotRotation] = useState(0);
  const [secDotRotation, setSecDotRotation] = useState(0);
  const [ampm, setAmPm] = useState("AM");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      const currentAmPm = h >= 12 ? "PM" : "AM";
      const formattedHours = h % 12 || 12;

      setHours(formattedHours);
      setMinutes(m < 10 ? "0" + m : m);
      setSeconds(s < 10 ? "0" + s : s);
      setHrDotRotation(h * 30);
      setMinDotRotation(m * 6);
      setSecDotRotation(s * 6);
      setAmPm(currentAmPm);
      setLoading(false);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header className="flex justify-start w-full transform -translate-x-70">
        <Link to="/">
          <i
            className=" z-10 fa-solid fa-angle-left absolute mt-8 md:mt-14 ml-6 md:ml-14 hover:scale-125 
          duration-300 text-xl md:text-3xl text-[#fcda7c]"
          ></i>
        </Link>
      </header>
      <main className="flex justify-center items-center min-h-screen">
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div
            id="time"
            className="flex flex-col md:flex-row justify-center gap-4 md:gap-28 items-center md:items-start text-white w-full mb-4"
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
                  style={{ strokeDashoffset: 440 - (440 * hours) / 12 }}
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
            {/* AM/PM */}
            <div className=" ap mt-4 md:mt-0">
              <div className="font-size-1em transform -translate-x-20">
                {ampm}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Clock;

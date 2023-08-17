import React, { useState, useEffect } from "react";
import alarm from "../assets/alarm.mp3";
import { Link } from "react-router-dom";

const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [ringtone, setRingtone] = useState(new Audio(alarm));
  const [hoursOptions, setHoursOptions] = useState([]);
  const [minutesOptions, setMinutesOptions] = useState([]);
  const [selectedHour, setSelectedHour] = useState("00");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [hrDotRotation, setHrDotRotation] = useState(0);
  const [minDotRotation, setMinDotRotation] = useState(0);
  const [secDotRotation, setSecDotRotation] = useState(0);

  useEffect(() => {
    setHoursOptions(generateOptions(24));
    setMinutesOptions(generateOptions(60));
  }, []);
  const generateOptions = (count) => {
    const options = [];
    for (let i = 0; i < count; i++) {
      const paddedValue = i < 10 ? `0${i}` : `${i}`;
      options.push(
        <option key={paddedValue} value={paddedValue}>
          {paddedValue}
        </option>
      );
    }
    return options;
  };
  const setAlarm = () => {
    if (isAlarmSet) {
      setAlarmTime("");
      ringtone.pause();
      setIsAlarmSet(false);
    } else {
      let time = `${selectedHour}:${selectedMinute}`;
      setIsAlarmSet(true);
      setAlarmTime(time);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();

      setHours(h < 10 ? "0" + h : h);
      setMinutes(m < 10 ? "0" + m : m);
      setSeconds(s < 10 ? "0" + s : s);
      setHrDotRotation(h * 15);
      setMinDotRotation(m * 6);
      setSecDotRotation(s * 6);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const formattedHours = `${hours}:${minutes}`;

      if (alarmTime === formattedHours) {
        ringtone.play();
        ringtone.loop = true;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [alarmTime, hours, minutes]);

  return (
    <div>
      <header>
        <Link to="/">
          <i className="fa-solid fa-angle-left absolute mt-14 ml-14 hover:scale-125 duration-300 text-3xl text-[#fcda7c]"></i>
        </Link>
      </header>

      <main className=" flex justify-center items-center min-h-screen flex-col ">
        <div className=" absolute flex gap-20">
          <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            className={`text-center w-28 font-medium text-5xl text-[#ffa351ff]
            focus:outline-none appearance-none outline-none border-none cursor-pointer hover:scale-105 
           duration-700 scrollbar-hide bg-[#201e20] ${
             isAlarmSet ? "pointer-events-none translate-y-14" : " "
           }`}
          >
            {hoursOptions}
          </select>
          <span
            className={`text-4xl text-white duration-700 ${
              isAlarmSet ? "translate-y-14" : " "
            }`}
          >
            :
          </span>
          <select
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(e.target.value)}
            className={`text-center w-28 font-medium text-5xl text-[#ffa351ff]
            focus:outline-none appearance-none outline-none border-none cursor-pointer hover:scale-105 
           duration-700 scrollbar-hide bg-[#201e20] ${
             isAlarmSet ? "pointer-events-none translate-y-14" : " "
           }`}
          >
            {minutesOptions}
          </select>
        </div>

        <div className="validate-wrapper">
          <div className="validate absolute">
            <i
              onClick={setAlarm}
              className={`fa ${
                isAlarmSet ? "fa-times" : "fa-check"
              } cursor-pointer fixed mt-32 ml-80 z-50 text-3xl hover:scale-x-110 duration-200 text-[#fcda7c]`}
            ></i>
          </div>
        </div>

        <div
          id="time"
          className={`duration-700 absolute flex justify-center gap-40 text-white w-full mb-4 
                transform ${
                  isAlarmSet ? "-translate-y-40" : "translate-y-[40rem]"
                }
                ${isAlarmSet ? "opacity-100" : "opacity-0"}`}
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
      </main>
    </div>
  );
};

export default Alarm;

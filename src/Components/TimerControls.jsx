// src/Components/TimerControls.jsx
import React from "react";

const TimerControls = ({ setMaxTime, setTimeLeft, maxTime }) => {
  const changeTime = (seconds) => {
    setMaxTime(seconds);
    setTimeLeft(seconds);
  };


  return (
    <div
      className="timer-controls"
      style={{ marginBottom: "15px", textAlign: "center" }}
    >
      <h3 className="heading">Set time:</h3>
      
      <div className="buttons">
        <button
          className={maxTime === 30 ? "active" : ""}
          onClick={() => changeTime(30)}
        >
          30s
        </button>
        <button
          className={maxTime === 60 ? "active" : ""}
          onClick={() => changeTime(60)}
        >
          60s
        </button>
        <button
          className={maxTime === 90 ? "active" : ""}
          onClick={() => changeTime(90)}
        >
          90s
        </button>
        <button
          className={maxTime === 120 ? "active" : ""}
          onClick={() => changeTime(120)}
        >
          120s
        </button>
        <button
          className={maxTime === 300 ? "active" : ""}
          onClick={() => changeTime(300)}
        >
          300s
        </button>
      
      </div>
    </div>
  );
};

export default TimerControls;

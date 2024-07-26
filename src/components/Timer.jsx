import { useCallback, useEffect, useState } from "react";
import useNow from "../hooks/useNow";
import UIButton from "./UI/UIButton";
export default function Timer({ updScramble }) {
  const [startAt, setStartAt] = useState();
  const [initialTimer, setInitialTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [times, setTimes] = useState([]);
  const [timeStyle, setTimeStyle] = useState({ color: "white" });

  const now = useNow(10, startAt);
  const timeFromStart = now - (startAt ?? now);
  const timer = timeFromStart + initialTimer;
  const toggleTimer = useCallback(() => {
    if (startAt) {
      setInitialTimer(timer);
      setStartAt();
    } else {
      setStartAt(Date.now());
    }
  }, [startAt, timer]);
  const handleSpaceClick = useCallback(
    (event) => {
      if (event.repeat) return;
      if (event.keyCode === 32) {
        if (event.type === "keydown" && running) {
          setInitialTimer(timer);
          setStartAt();
          setRunning(false);
          setTimes((lastTimes) => [...lastTimes, timer]);
          updScramble();
        } else if (event.type === "keydown" && !running) {
          if (initialTimer) {
            setInitialTimer(0);
          }
          setTimeStyle({ color: "tomato" });
        } else if (event.type === "keyup" && !running && !timer) {
          setTimeStyle({ color: "white" });
          setInitialTimer(0);
          setStartAt(Date.now());
          setRunning(true);
        }
      }
    },
    [timer, running, updScramble, initialTimer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleSpaceClick);
    window.addEventListener("keyup", handleSpaceClick);
    return () => {
      window.removeEventListener("keydown", handleSpaceClick);
      window.removeEventListener("keyup", handleSpaceClick);
    };
  }, [handleSpaceClick]);

  return (
    <div className="flex flex-col gap-3 items-center max-w-7xl">
      <div className="font-medium flex text-5xl " style={timeStyle}>
        <span className="inline-block min-w-7">{format(timer).mins}</span>:
        <span className="inline-block min-w-7">{format(timer).secs}</span>.
        <span className="inline-block min-w-7 text-xl underline">
          {format(timer).ms}
        </span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <UIButton onClick={() => setInitialTimer(0)}>Restart</UIButton>
        <UIButton onClick={toggleTimer}>
          {startAt !== undefined ? "Stop" : timer === 0 ? "Start" : "Resume"}
        </UIButton>
      </div>
      <div className="border bg-teal-900 border-green-300 p-5 rounded-2xl">
        <h3 className="font-bold text-4xl text-center mb-5">TIMES</h3>
        <div className="flex justify-center items-center gap-3 flex-wrap">
          {times.length > 0 ? (
            times.map((el, index) => {
              return (
                <UIButton disabled={false} key={index}>{`${index + 1}. ${
                  format(el).mins
                }:${format(el).secs}:${format(el).ms}`}</UIButton>
              );
            })
          ) : (
            <p className="text-center">EMPTY</p>
          )}
        </div>
      </div>
    </div>
  );
}

const format = (time) => {
  time = Math.max(time, 0);
  let mins = Math.floor(time / 60000);
  let secs = Math.floor(time / 1000);
  let ms = Math.floor((time % 1000) / 10);
  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;
  ms = ms < 10 ? "0" + ms : ms;
  return {
    mins: mins,
    ms: ms,
    secs: secs < 60 ? secs : secs % 60 < 10 ? "0" + (secs % 60) : secs % 60,
  };
};

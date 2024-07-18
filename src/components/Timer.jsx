import { useCallback, useEffect, useState } from "react";
import useNow from "../hooks/useNow";
export default function Timer() {
  const [startAt, setStartAt] = useState();
  const [initialTimer, setInitialTimer] = useState(0);
  const [running, setRunning] = useState(false);

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
      if (event.keyCode === 32) {
        if (startAt) {
          setInitialTimer(timer);
          setStartAt();
        } else {
          setStartAt(Date.now());
        }
      }
    },
    [startAt, timer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleSpaceClick);
    return () => {
      window.removeEventListener("keydown", handleSpaceClick);
    };
  }, [handleSpaceClick]);
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="font-medium flex text-3xl gap-1">
        <span className="inline-block w-8">{format(timer).mins}</span>:
        <span className="inline-block w-8">{format(timer).secs}</span>.
        <span className="inline-block w-5 text-xl underline">
          {format(timer).ms}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          className="border border-green-300 bg-green-800 p-2 rounded-full w-24"
          onClick={() => setInitialTimer(0)}
        >
          Restart
        </button>
        <button
          className="border border-green-300 bg-green-800 p-2 rounded-full w-24"
          onClick={toggleTimer}
        >
          {startAt !== undefined ? "Stop" : timer === 0 ? "Start" : "Resume"}
        </button>
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

import { useCallback, useEffect, useState } from "react";
import useNow from "../hooks/useNow";
import UIButton from "./UI/UIButton";
import clsx from "clsx";
export default function Timer({
  scramble,
  updScramble,
  setActive,
  setModalChild,
  className,
}) {
  const [startAt, setStartAt] = useState();
  const [initialTimer, setInitialTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [times, setTimes] = useState([]);
  const [timeStyle, setTimeStyle] = useState({ color: "white" });

  const now = useNow(10, startAt);
  const timeFromStart = now - (startAt ?? now);
  const timer = timeFromStart + initialTimer;

  const handleSpaceClick = useCallback(
    (event) => {
      if (event.repeat) return;
      if (event.keyCode === 32) {
        if (event.type === "keydown" && running) {
          setInitialTimer(timer);
          setStartAt();
          setRunning(false);
          setTimes((lastTimes) => [
            { time: timer, scramble: scramble },
            ...lastTimes,
          ]);
          updScramble();
        } else if (event.type === "keydown" && !running) {
          if (initialTimer) {
            setInitialTimer(0);
          }
          setTimeStyle({ color: "rgb(134 239 172)" });
        } else if (event.type === "keyup" && !running && !timer) {
          setTimeStyle({ color: "white" });
          setInitialTimer(0);
          setStartAt(Date.now());
          setRunning(true);
        }
      }
    },
    [timer, running, updScramble, initialTimer, scramble]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleSpaceClick);
    window.addEventListener("keyup", handleSpaceClick);
    return () => {
      window.removeEventListener("keydown", handleSpaceClick);
      window.removeEventListener("keyup", handleSpaceClick);
    };
  }, [handleSpaceClick]);

  function getSolveInfo(index, scramble, time) {
    return (
      <div>
        <div className="font-bold">
          Solve <span className="text-green-300">№{index + 1}</span>
        </div>
        <div>
          Scramble: <span className="text-green-300">{scramble}</span>
        </div>
        <div>
          Time:
          <span className="text-green-300">
            {format(time).mins > 0
              ? ` ${format(time).mins}:${format(time).secs}.${format(time).ms}`
              : ` ${format(time).secs}.${format(time).ms}`}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(className, "flex gap-3 items-center w-full")}>
      <div className="flex flex-wrap justify-center gap-3 w-2/12 h-full">
        <div className="border bg-teal-900 border-green-300 p-5 rounded-lg w-full h-1/3">
          STATS HERE
        </div>
        <div className="w-full h-2/3">
          <div className="border bg-teal-900 border-green-300 p-5 rounded-lg h-full overflow-auto">
            {times.length > 0 ? (
              times.map((el, index) => {
                return (
                  <UIButton
                    className={`w-full overflow-hidden flex h-fit mb-3`}
                    disabled={false}
                    key={index}
                    onClick={() => {
                      setActive(true);
                      setModalChild(
                        getSolveInfo(
                          times.length - index - 1,
                          el.scramble,
                          el.time
                        )
                      );
                    }}
                  >
                    <span className="font-semibold relative after:w-px after:h-9 after:bg-green-300 after:ml-1.5 after:absolute after:-top-2 inline-block w-fit mx-3">{`${
                      times.length - index
                    } `}</span>
                    {format(el.time).mins > 0
                      ? `${format(el.time).mins}:${format(el.time).secs}.${
                          format(el.time).ms
                        }`
                      : `${format(el.time).secs}.${format(el.time).ms}`}
                  </UIButton>
                );
              })
            ) : (
              <p className="text-center">no solves</p>
            )}
          </div>
        </div>
      </div>
      <div
        className="font-medium flex items-center justify-center text-5xl w-10/12"
        style={timeStyle}
      >
        <span className="inline-block min-w-7">{format(timer).mins}</span>:
        <span className="inline-block min-w-7">{format(timer).secs}</span>.
        <span className="inline-block min-w-7 text-xl underline">
          {format(timer).ms}
        </span>
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

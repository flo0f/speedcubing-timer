import { useState } from "react";
import UIButton from "./UI/UIButton";
export default function Scramble() {
  const DIRECTIONS = [
    ["D", "U"],
    ["L", "R"],
    ["F", "B"],
  ];
  const TIMES = ["", "'", "2"];

  const random = (array, exclude) => {
    do {
      var n = Math.floor(Math.random() * array.length);
    } while (array[n] === exclude);
    return array[n];
  };

  function generateNewScramble() {
    const scramble = new Array(20);
    var direction;
    for (var i = 0; i < scramble.length; i++) {
      direction = random(DIRECTIONS, direction);
      scramble[i] = random(direction) + random(TIMES);
    }
    return scramble;
  }

  const [scr, setScr] = useState(generateNewScramble());
  function updateScr() {
    setScr(generateNewScramble());
  }
  return (
    <div className="w-full text-center flex items-center justify-center gap-5 border bg-teal-900 border-green-300 p-5 rounded-2xl">
      <UIButton onClick={updateScr}>New scramble</UIButton>
      <span>{scr.join(" ")}</span>
    </div>
  );
}

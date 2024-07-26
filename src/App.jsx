import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import { useState } from "react";
import ScrambleGenerator from "./components/ScrambleGenerator";

function App() {
  const [scramble, setScramble] = useState(ScrambleGenerator());
  function updScramble() {
    setScramble(ScrambleGenerator());
  }
  return (
    <>
      <div className="h-full bg-teal-800 text-white flex flex-col items-center">
        <Scramble scramble={scramble.join(" ")} updScramble={updScramble} />
        <Timer updScramble={updScramble} />
      </div>
    </>
  );
}

export default App;

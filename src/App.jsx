import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
import { useState } from "react";
import ScrambleGenerator from "./components/ScrambleGenerator";
import Modal from "./components/Modal";
function App() {
  const [scramble, setScramble] = useState(ScrambleGenerator());
  const [modalActive, setModalActive] = useState(false);
  function updScramble() {
    setScramble(ScrambleGenerator());
  }

  const [modalChild, setModalChild] = useState("content");
  return (
    <>
      <div className="h-full bg-teal-800 text-white flex flex-col items-center">
        <Scramble scramble={scramble} updScramble={updScramble} />
        <Timer
          scramble={scramble}
          updScramble={updScramble}
          setActive={setModalActive}
          setModalChild={setModalChild}
        />
        <Modal active={modalActive} setActive={setModalActive}>
          {modalChild}
        </Modal>
      </div>
    </>
  );
}

export default App;

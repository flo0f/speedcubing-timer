import Timer from "./components/Timer";
import Scramble from "./components/Scramble";
function App() {
  return (
    <>
      <div className="h-full bg-teal-800 text-white flex flex-col items-center">
        <Scramble />
        <Timer />
      </div>
    </>
  );
}

export default App;

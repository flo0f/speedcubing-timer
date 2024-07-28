import clsx from "clsx";

export default function Modal({ active, setActive, children }) {
  return (
    <div
      className={clsx(
        active ? "scale-100" : "scale-0",
        "fixed flex items-center justify-center w-screen h-screen bg-transparent backdrop-blur-sm"
      )}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className="border text-center p-5 bg-teal-900 border-green-300 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

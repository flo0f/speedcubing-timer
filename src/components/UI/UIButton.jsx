import clsx from "clsx";
export default function UIButton({ className, onClick, children }) {
  return (
    <button
      className={clsx(
        className,
        "border border-green-300 bg-green-800 px-4 py-2 rounded-full min-w-24"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

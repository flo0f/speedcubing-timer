import clsx from "clsx";
export default function UIButton({
  className,
  onClick,
  children,
  disabled = true,
}) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        className,
        disabled
          ? "border-green-300 bg-green-800 opacity-20"
          : "border-green-300 bg-green-800",
        "border py-1 rounded-lg min-w-24"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

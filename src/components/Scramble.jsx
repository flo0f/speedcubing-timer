import clsx from "clsx";
import UIButton from "./UI/UIButton";

export default function Scramble({ scramble, updScramble, className }) {
  return (
    <div
      className={clsx(
        className,
        "w-full text-center flex items-center justify-center gap-5 border bg-teal-900 border-green-300 p-5 rounded-lg mb-3"
      )}
    >
      <UIButton className="px-5" disabled={false} onClick={updScramble}>
        New scramble
      </UIButton>
      <span>{scramble}</span>
    </div>
  );
}

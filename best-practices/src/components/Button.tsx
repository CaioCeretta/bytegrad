import { ReactNode } from "react";

export default function Button({ onClick, buttonType, children }: {
  onClick: () => void,
  buttonType: string,
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`btn ${buttonType === "secondary" ? "btn--secondary" : ""}`}
    >
      {children}
    </button>
  );
}
import { ReactNode } from "react";

export default function Button({ onClick, buttonType, children, text }: {
  onClick?: () => void,
  buttonType: string,
  children?: ReactNode,
  text?: string,
  
}) {
  return (
    <button
      onClick={onClick}
      className={`btn ${buttonType === "secondary" ? "btn--secondary" : ""}`}
    >
      {children || text}
    </button>
  );
}
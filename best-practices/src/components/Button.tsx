import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface ButtonProps {
  onClick?: () => void,
  buttonType: "secondary" | "primary",
  children?: ReactNode,
  text?: string,
  className?: string
}

export default function Button({ onClick, buttonType, className, children, text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn('btn',className, buttonType === "secondary" && "btn--secondary")}
    >
      {children || text}
    </button>
  );
}
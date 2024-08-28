import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface ButtonProps {
  onClick?: () => void,
  buttonType?: "secondary" | "primary",
  type: 'submit' | 'button'
  children?: ReactNode,
  text?: string,
  className?: string
}

export default function Button({ onClick, buttonType, className, children, text, type }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn('btn',className, buttonType === "secondary" && "btn--secondary")}
    >
      {children || text}
    </button>
  );
}
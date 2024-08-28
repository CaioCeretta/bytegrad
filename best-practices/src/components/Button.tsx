import { ReactNode } from "react";
import { cn } from "../lib/utils";

export default function Button({ onClick, buttonType, className, children, text }: {
  onClick?: () => void,
  buttonType: string,
  children?: ReactNode,
  text?: string,
  className?: string
  
}) {
  return (
    <button
      onClick={onClick}
      className={cn('btn',className, buttonType === "secondary" && "btn--secondary")}
    >
      {children || text}
    </button>
  );
}
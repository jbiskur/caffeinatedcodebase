import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type MissingTextProps = {
  text: string | ReactNode;
  className?: string;
};

/**
 * Represents a component for displaying a default missing text with a sad emoji.
 * @param text - The text to display.
 * @param className - An optional class name to apply to the component.
 */
export const MissingText = ({ text, className }: MissingTextProps) => {
  return (
    <div className={cn("text-center font-light", className)}>
      <p>{text}</p>
    </div>
  );
};

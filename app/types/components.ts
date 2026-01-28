export interface PidifyJsProps {
  align?: "left" | "right";
}

export interface TailStackProps {
  align?: "left" | "right";
}

export type TerminalLineType =
  | "command"
  | "output"
  | "success"
  | "ready"
  | "section"
  | "processing";

export interface TerminalLine {
  type: TerminalLineType;
  text: string;
  delay: number;
}

export interface StreamNetProps {
  align?: "left" | "right";
}

export interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}


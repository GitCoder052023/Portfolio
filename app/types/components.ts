export interface InViewProps {
  isInView: boolean;
}

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

export interface PidifyFeaturesProps extends InViewProps {

  align: "left" | "right";
}


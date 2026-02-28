export interface InViewProps {
  isInView: boolean;
}

export interface ProjectFeature {
  icon: any;
  title: string;
  description: string;
  accent: string;
}

export interface ProjectHighlight {
  icon: any;
  title: string;
  description: string;
  color: string;
  borderColor: string;
}

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  githubUrl: string;
  docsUrl?: string;
  features: ProjectFeature[];
  highlights: ProjectHighlight[];
  backgroundColors: {
    top: string;
    bottom: string;
  };
}

export interface ProjectSectionProps {
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



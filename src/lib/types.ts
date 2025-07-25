// WorksheetWise shared types

export interface WorksheetProblem {
  id: number;
  type: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  christianConnection?: string;
  materials?: string;
}

export interface WorksheetVisualAsset {
  description: string;
  purpose: string;
  imageUrl?: string;
  source?: string;
  attribution?: string;
  attributionUrl?: string;
  license?: string;
}

export interface WorksheetResult {
  title: string;
  grade: string;
  subject: string;
  topic: string;
  description: string;
  instructions: string;
  estimatedTime: string;
  problems: WorksheetProblem[];
  answerKey: string;
  extensions?: string[];
  materials?: string[];
  error?: string;
  visualAssets?: WorksheetVisualAsset[];
}

export interface UserSelections {
  grade: string;
  subject: string;
  topic: string;
  worksheetStyle: string;
  christianContent: string;
  scaffolding: string;
  differentiation: string;
  timeEstimate: string;
  numProblems?: number;
  subjectInfo?: {
    specialInstructions?: string;
    activityTypes?: string[];
  };
}

export interface UnsplashImage {
  id: string;
  urls: { small: string; full: string };
  alt_description?: string;
  photographer?: string;
  photographerUrl?: string;
}

export interface WikimediaImage {
  id: string;
  title: string;
  url: string;
  thumbUrl?: string;
  width?: number;
  height?: number;
  description?: string;
  license?: string;
  attribution?: string;
  pageUrl?: string;
}

export interface ColoringSheetPage {
  title: string;
  description: string;
  elements: string[];
  imageUrl?: string;
}

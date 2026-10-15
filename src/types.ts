export type ChapterId = "fourier" | "pde" | "complex";

export type Difficulty = "easy" | "medium" | "hard";

export type SourceCategory = "university_exam" | "konkur_arshad" | "textbook";

export interface SolutionStep {
  title: string;
  text?: string;
  math?: string[];
  note?: string;
}

export interface SolvedProblem {
  id: string;
  chapterId: ChapterId;
  subTopic: string;
  subTopicLabel: string;
  title: string;
  difficulty: Difficulty;
  source: string;
  sourceCategory: SourceCategory;
  statement: string;
  statementMath?: string[];
  hint: string;
  examTrap: string;
  steps: SolutionStep[];
  finalAnswer: string[];
  keyTakeaway?: string;
}

export interface QuizOption {
  id: number;
  text?: string;
  math?: string;
}

export interface QuizQuestion {
  id: string;
  chapterId: ChapterId;
  subTopic: string;
  question: string;
  questionMath?: string[];
  options: [QuizOption, QuizOption, QuizOption, QuizOption];
  correctOption: number; // 0..3
  source: string;
  difficulty: Difficulty;
  explanation: {
    summary: string;
    steps: SolutionStep[];
    trap?: string;
  };
}

export interface FormulaItem {
  id: string;
  title: string;
  category: string;
  latex: string;
  description: string;
  conditions?: string;
  tag?: string;
}

export interface ChapterInfo {
  id: ChapterId;
  number: number;
  title: string;
  subtitle: string;
  englishTitle: string;
  description: string;
  iconName: string;
  color: string;
  accentColor: string;
  subTopics: Array<{ id: string; label: string; count?: number }>;
}

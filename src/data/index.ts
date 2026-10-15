import { ChapterId, SolvedProblem, QuizQuestion, FormulaItem } from "../types";
import { CHAPTERS } from "./chapters";
import { FOURIER_PROBLEMS, FOURIER_QUIZ, FOURIER_FORMULAS } from "./fourierData";
import { PDE_PROBLEMS, PDE_QUIZ, PDE_FORMULAS } from "./pdeData";
import { COMPLEX_PROBLEMS, COMPLEX_QUIZ, COMPLEX_FORMULAS } from "./complexData";

export { CHAPTERS } from "./chapters";
export { FOURIER_PROBLEMS, FOURIER_QUIZ, FOURIER_FORMULAS } from "./fourierData";
export { PDE_PROBLEMS, PDE_QUIZ, PDE_FORMULAS } from "./pdeData";
export { COMPLEX_PROBLEMS, COMPLEX_QUIZ, COMPLEX_FORMULAS } from "./complexData";

export const ALL_PROBLEMS: SolvedProblem[] = [
  ...FOURIER_PROBLEMS,
  ...PDE_PROBLEMS,
  ...COMPLEX_PROBLEMS,
];

export const ALL_QUIZZES: QuizQuestion[] = [
  ...FOURIER_QUIZ,
  ...PDE_QUIZ,
  ...COMPLEX_QUIZ,
];

export const ALL_FORMULAS: FormulaItem[] = [
  ...FOURIER_FORMULAS,
  ...PDE_FORMULAS,
  ...COMPLEX_FORMULAS,
];

export function getProblemsByChapter(chapterId: ChapterId): SolvedProblem[] {
  switch (chapterId) {
    case "fourier":
      return FOURIER_PROBLEMS;
    case "pde":
      return PDE_PROBLEMS;
    case "complex":
      return COMPLEX_PROBLEMS;
    default:
      return [];
  }
}

export function getQuizByChapter(chapterId: ChapterId): QuizQuestion[] {
  switch (chapterId) {
    case "fourier":
      return FOURIER_QUIZ;
    case "pde":
      return PDE_QUIZ;
    case "complex":
      return COMPLEX_QUIZ;
    default:
      return [];
  }
}

export function getFormulasByChapter(chapterId: ChapterId): FormulaItem[] {
  switch (chapterId) {
    case "fourier":
      return FOURIER_FORMULAS;
    case "pde":
      return PDE_FORMULAS;
    case "complex":
      return COMPLEX_FORMULAS;
    default:
      return [];
  }
}

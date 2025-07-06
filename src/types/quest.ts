export interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  explanation: string; // Added to provide feedback
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  era: string;
  image: string;
  xp: number;
  quiz?: QuizQuestion[]; // A quest can optionally have a quiz
}

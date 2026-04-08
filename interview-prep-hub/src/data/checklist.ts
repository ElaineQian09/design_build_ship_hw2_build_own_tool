export type ChecklistCategory =
  | "resume"
  | "technical"
  | "behavioral"
  | "logistics";

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  category: ChecklistCategory;
}

export const checklistItems: ChecklistItem[] = [
  // Resume & Applications
  { id: "1", label: "Update resume with recent projects", completed: true, category: "resume" },
  { id: "2", label: "Tailor resume for each target role", completed: false, category: "resume" },
  { id: "3", label: "Ask a friend to proofread resume", completed: true, category: "resume" },
  { id: "4", label: "Update LinkedIn profile and headline", completed: false, category: "resume" },

  // Technical Prep
  { id: "5", label: "Review top 20 LeetCode problems", completed: false, category: "technical" },
  { id: "6", label: "Practice 2 system design problems end-to-end", completed: false, category: "technical" },
  { id: "7", label: "Review Big-O complexity cheat sheet", completed: true, category: "technical" },
  { id: "8", label: "Brush up on SQL and database fundamentals", completed: false, category: "technical" },

  // Behavioral Prep
  { id: "9", label: "Practice STAR method for behavioral questions", completed: true, category: "behavioral" },
  { id: "10", label: "Prepare personal pitch (60-second intro)", completed: true, category: "behavioral" },
  { id: "11", label: "Prepare 3 questions to ask the interviewer", completed: true, category: "behavioral" },
  { id: "12", label: "Write down 5 stories that cover leadership, failure, conflict, teamwork, and impact", completed: false, category: "behavioral" },

  // Logistics
  { id: "13", label: "Research target companies", completed: false, category: "logistics" },
  { id: "14", label: "Mock interview with a friend", completed: false, category: "logistics" },
  { id: "15", label: "Test video/audio setup for virtual interviews", completed: true, category: "logistics" },
  { id: "16", label: "Prepare outfit and materials for onsite", completed: false, category: "logistics" },
];

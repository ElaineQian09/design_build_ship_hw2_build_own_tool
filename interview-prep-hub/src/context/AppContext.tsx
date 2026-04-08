"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  questions as seedQuestions,
  type Question,
} from "@/data/questions";
import { companies as seedCompanies, type Company } from "@/data/companies";
import {
  checklistItems as seedChecklist,
  type ChecklistItem,
} from "@/data/checklist";

/* ---------- context shape ---------- */

interface AppContextValue {
  questions: Question[];
  companies: Company[];
  checklistItems: ChecklistItem[];
  addQuestion: (q: Omit<Question, "id" | "dateAdded">) => void;
  toggleChecklistItem: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

/* ---------- provider ---------- */

export function AppProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>(seedQuestions);
  const [companies] = useState<Company[]>(seedCompanies);
  const [checklistItems, setChecklistItems] =
    useState<ChecklistItem[]>(seedChecklist);

  function addQuestion(data: Omit<Question, "id" | "dateAdded">) {
    const newQuestion: Question = {
      ...data,
      id: String(Date.now()),
      dateAdded: new Date().toISOString().slice(0, 10),
    };
    setQuestions((prev) => [...prev, newQuestion]);
  }

  function toggleChecklistItem(id: string) {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <AppContext.Provider
      value={{ questions, companies, checklistItems, addQuestion, toggleChecklistItem }}
    >
      {children}
    </AppContext.Provider>
  );
}

/* ---------- hook ---------- */

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside <AppProvider>");
  }
  return ctx;
}

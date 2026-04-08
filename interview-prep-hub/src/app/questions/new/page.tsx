"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { useApp } from "@/context/AppContext";
import type { Question, QuestionStatus } from "@/data/questions";

/* ---------- option lists ---------- */

const categoryOptions: { value: Question["category"]; label: string }[] = [
  { value: "behavioral", label: "Behavioral" },
  { value: "technical", label: "Technical" },
  { value: "system-design", label: "System Design" },
  { value: "resume", label: "Resume" },
];

const difficultyOptions: { value: Question["difficulty"]; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const statusOptions: { value: QuestionStatus; label: string }[] = [
  { value: "not-started", label: "Not Started" },
  { value: "practicing", label: "Practicing" },
  { value: "mastered", label: "Mastered" },
];

/* ================================================== */

export default function NewQuestionPage() {
  const router = useRouter();
  const { companies, addQuestion } = useApp();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Question["category"]>("behavioral");
  const [company, setCompany] = useState(companies[0]?.name ?? "");
  const [difficulty, setDifficulty] = useState<Question["difficulty"]>("medium");
  const [status, setStatus] = useState<QuestionStatus>("not-started");
  const [notes, setNotes] = useState("");
  const [outline, setOutline] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "Title is required.";
    if (!company.trim()) next.company = "Company is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    addQuestion({
      title: title.trim(),
      category,
      company: company.trim(),
      difficulty,
      status,
      notes: notes.trim(),
      outline: outline.trim(),
    });

    router.push("/questions");
  }

  return (
    <div>
      <PageHeader
        title="Add a New Question"
        description="Log an interview question you've encountered or want to practice."
      />

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* ---- Title ---- */}
        <Field label="Question Title" required error={errors.title}>
          <input
            type="text"
            placeholder='e.g. "Tell me about a time you disagreed with your manager."'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass(errors.title)}
          />
        </Field>

        {/* ---- Category + Difficulty row ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Category">
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Question["category"])
              }
              className={selectClass}
            >
              {categoryOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Difficulty">
            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as Question["difficulty"])
              }
              className={selectClass}
            >
              {difficultyOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* ---- Company + Status row ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Company" required error={errors.company}>
            <input
              type="text"
              list="company-suggestions"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass(errors.company)}
            />
            <datalist id="company-suggestions">
              {companies.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
          </Field>

          <Field label="Status">
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as QuestionStatus)
              }
              className={selectClass}
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* ---- Notes ---- */}
        <Field label="Notes" hint="Tips, context, or things to remember.">
          <textarea
            rows={3}
            placeholder="Any notes about this question..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={textareaClass}
          />
        </Field>

        {/* ---- Outline ---- */}
        <Field label="Answer Outline" hint="Sketch the key points of your answer.">
          <textarea
            rows={4}
            placeholder="1. Open with…&#10;2. Key example…&#10;3. Wrap up with…"
            value={outline}
            onChange={(e) => setOutline(e.target.value)}
            className={textareaClass}
          />
        </Field>

        {/* ---- Actions ---- */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
          >
            Add Question
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Sub-components & style helpers ---------- */

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {hint && <span className="block text-xs text-slate-400 mt-0.5">{hint}</span>}
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </label>
  );
}

const baseInput =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors";

function inputClass(error?: string) {
  return `${baseInput} ${
    error
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-slate-200 focus:border-indigo-300 focus:ring-indigo-100"
  }`;
}

const selectClass = `${baseInput} border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-9`;

const textareaClass = `${baseInput} border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 resize-y`;

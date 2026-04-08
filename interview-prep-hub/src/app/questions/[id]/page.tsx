"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import type { Question, QuestionStatus } from "@/data/questions";

/* ---------- style maps ---------- */

const categoryStyle: Record<Question["category"], string> = {
  behavioral: "bg-purple-50 text-purple-700 ring-purple-200",
  technical: "bg-blue-50 text-blue-700 ring-blue-200",
  "system-design": "bg-pink-50 text-pink-700 ring-pink-200",
  resume: "bg-orange-50 text-orange-700 ring-orange-200",
};

const categoryLabel: Record<Question["category"], string> = {
  behavioral: "Behavioral",
  technical: "Technical",
  "system-design": "System Design",
  resume: "Resume",
};

const difficultyStyle: Record<Question["difficulty"], string> = {
  easy: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  hard: "bg-red-50 text-red-700",
};

const statusStyle: Record<QuestionStatus, string> = {
  "not-started": "bg-slate-100 text-slate-600",
  practicing: "bg-amber-50 text-amber-700",
  mastered: "bg-emerald-50 text-emerald-700",
};

const statusLabel: Record<QuestionStatus, string> = {
  "not-started": "Not Started",
  practicing: "Practicing",
  mastered: "Mastered",
};

/* ================================================== */

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { questions } = useApp();

  const question = questions.find((q) => q.id === id);

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-slate-100 mb-5">
          <svg
            className="h-6 w-6 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.01"
            />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-slate-800">
          Question not found
        </h1>
        <p className="mt-1 text-sm text-slate-400 max-w-xs">
          This question may have been removed or the link is incorrect.
        </p>
        <Link
          href="/questions"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Questions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* ---- Back link ---- */}
      <Link
        href="/questions"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        All Questions
      </Link>

      {/* ---- Header card ---- */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ring-inset ${categoryStyle[question.category]}`}
          >
            {categoryLabel[question.category]}
          </span>
          <span
            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${difficultyStyle[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
          <span
            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${statusStyle[question.status]}`}
          >
            {statusLabel[question.status]}
          </span>
        </div>

        <h1 className="text-xl font-bold text-slate-900 leading-snug">
          {question.title}
        </h1>

        <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15"
              />
            </svg>
            {question.company}
          </span>
          <span className="text-slate-200">|</span>
          <span className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            Added {question.dateAdded}
          </span>
        </div>
      </div>

      {/* ---- Notes ---- */}
      <Section title="Notes" icon={notesIcon} empty={!question.notes}>
        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          {question.notes}
        </p>
      </Section>

      {/* ---- Answer Outline ---- */}
      <Section title="Answer Outline" icon={outlineIcon} empty={!question.outline}>
        <div className="space-y-2">
          {question.outline.split("\n").map((line, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-indigo-50 text-[11px] font-semibold text-indigo-600">
                {i + 1}
              </span>
              <p className="text-sm text-slate-600 leading-relaxed">
                {line.replace(/^\d+\.\s*/, "")}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function Section({
  title,
  icon,
  empty,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  empty: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm mb-6">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
        {icon}
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="px-5 py-4">
        {empty ? (
          <p className="text-sm text-slate-300 italic">
            No {title.toLowerCase()} yet — add some from the edit page.
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

/* ---------- Icons ---------- */

const notesIcon = (
  <svg
    className="h-4 w-4 text-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

const outlineIcon = (
  <svg
    className="h-4 w-4 text-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm0 5.25h.007v.008H3.75V12zm0 5.25h.007v.008H3.75v-.008z"
    />
  </svg>
);

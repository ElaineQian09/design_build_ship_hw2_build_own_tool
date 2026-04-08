"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { useApp } from "@/context/AppContext";
import type { Question } from "@/data/questions";

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

const categories: Question["category"][] = [
  "behavioral",
  "technical",
  "resume",
  "system-design",
];

/* ================================================== */

export default function QuestionsPage() {
  const { questions } = useApp();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    Question["category"] | "all"
  >("all");

  const filtered = questions.filter((q) => {
    const matchesSearch = q.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || q.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const counts = {
    all: questions.length,
    behavioral: questions.filter((q) => q.category === "behavioral").length,
    technical: questions.filter((q) => q.category === "technical").length,
    resume: questions.filter((q) => q.category === "resume").length,
    "system-design": questions.filter((q) => q.category === "system-design")
      .length,
  };

  return (
    <div>
      <PageHeader
        title="Question Bank"
        description="Browse, search, and filter your interview questions."
      />

      {/* ---- Search ---- */}
      <div className="relative mb-5">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      {/* ---- Category Filters ---- */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory("all")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All{" "}
          <span
            className={`ml-1 ${activeCategory === "all" ? "text-indigo-200" : "text-slate-400"}`}
          >
            {counts.all}
          </span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {categoryLabel[cat]}{" "}
            <span
              className={`ml-1 ${activeCategory === cat ? "text-indigo-200" : "text-slate-400"}`}
            >
              {counts[cat]}
            </span>
          </button>
        ))}
      </div>

      {/* ---- Results Count ---- */}
      <p className="text-xs text-slate-400 mb-3">
        {filtered.length} {filtered.length === 1 ? "question" : "questions"}{" "}
        found
      </p>

      {/* ---- Questions List ---- */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm text-slate-400">
            No questions match your search.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <Link
              key={q.id}
              href={`/questions/${q.id}`}
              className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left side */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span
                      className={`shrink-0 h-2 w-2 rounded-full ${
                        q.status === "mastered" ? "bg-emerald-400" : q.status === "practicing" ? "bg-amber-400" : "bg-slate-300"
                      }`}
                      title={q.status}
                    />
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                      {q.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 ml-[18px]">
                    <span className="text-[11px] text-slate-400">
                      {q.company}
                    </span>
                    <span className="text-slate-200">·</span>
                    <span className="text-[11px] text-slate-400">
                      {q.dateAdded}
                    </span>
                  </div>
                </div>

                {/* Right side: badges */}
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  {q.status !== "not-started" && (
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      q.status === "mastered" ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
                    }`}>
                      {q.status === "mastered" ? "Mastered" : "Practicing"}
                    </span>
                  )}
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 ring-inset ${categoryStyle[q.category]}`}
                  >
                    {categoryLabel[q.category]}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${difficultyStyle[q.difficulty]}`}
                  >
                    {q.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

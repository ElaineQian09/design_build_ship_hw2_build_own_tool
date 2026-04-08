"use client";

import PageHeader from "@/components/PageHeader";
import { useApp } from "@/context/AppContext";
import type { ChecklistCategory } from "@/data/checklist";

/* ---------- category metadata ---------- */

const categoryMeta: Record<
  ChecklistCategory,
  { label: string; icon: React.ReactNode; accent: string }
> = {
  resume: {
    label: "Resume & Applications",
    accent: "text-indigo-600 bg-indigo-50",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  technical: {
    label: "Technical Prep",
    accent: "text-blue-600 bg-blue-50",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  behavioral: {
    label: "Behavioral Prep",
    accent: "text-purple-600 bg-purple-50",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  logistics: {
    label: "Logistics",
    accent: "text-amber-600 bg-amber-50",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
};

const categoryOrder: ChecklistCategory[] = [
  "resume",
  "technical",
  "behavioral",
  "logistics",
];

/* ================================================== */

export default function ChecklistPage() {
  const { checklistItems, toggleChecklistItem } = useApp();

  const total = checklistItems.length;
  const done = checklistItems.filter((i) => i.completed).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      <PageHeader
        title="Prep Checklist"
        description="Stay on track — check off each step as you go."
      />

      {/* ---- Progress card ---- */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 mb-8">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-slate-900">{pct}%</p>
            <p className="text-xs text-slate-400">
              {done} of {total} tasks completed
            </p>
          </div>
          {pct === 100 && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              All done!
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* ---- Grouped checklist ---- */}
      <div className="space-y-6">
        {categoryOrder.map((cat) => {
          const meta = categoryMeta[cat];
          const items = checklistItems.filter((i) => i.category === cat);
          const catDone = items.filter((i) => i.completed).length;

          return (
            <div
              key={cat}
              className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Category header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex items-center justify-center h-7 w-7 rounded-lg ${meta.accent}`}
                  >
                    {meta.icon}
                  </span>
                  <h2 className="text-sm font-semibold text-slate-800">
                    {meta.label}
                  </h2>
                </div>
                <span className="text-xs text-slate-400">
                  {catDone}/{items.length}
                </span>
              </div>

              {/* Items */}
              <ul className="divide-y divide-slate-100">
                {items.map((item) => (
                  <li key={item.id} className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => toggleChecklistItem(item.id)}
                      className="flex items-center gap-3 w-full text-left group"
                    >
                      <span
                        className={`shrink-0 flex items-center justify-center h-5 w-5 rounded-md border-2 transition-colors ${
                          item.completed
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-slate-300 bg-white group-hover:border-indigo-400"
                        }`}
                      >
                        {item.completed && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </span>
                      <span
                        className={`text-sm transition-colors ${
                          item.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-700"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import PageHeader from "@/components/PageHeader";
import { useApp } from "@/context/AppContext";
import type { InterviewStage, Priority } from "@/data/companies";

/* ---------- style / label maps ---------- */

const stageLabel: Record<InterviewStage, string> = {
  researching: "Researching",
  applied: "Applied",
  "phone-screen": "Phone Screen",
  onsite: "Onsite",
  offer: "Offer",
};

const stageStyle: Record<InterviewStage, string> = {
  researching: "bg-slate-100 text-slate-600",
  applied: "bg-blue-50 text-blue-700",
  "phone-screen": "bg-violet-50 text-violet-700",
  onsite: "bg-amber-50 text-amber-700",
  offer: "bg-emerald-50 text-emerald-700",
};

const priorityLabel: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const priorityStyle: Record<Priority, string> = {
  low: "bg-slate-100 text-slate-500",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-red-50 text-red-600",
};

/* ================================================== */

export default function CompaniesPage() {
  const { companies, questions } = useApp();

  const stageCounts: Record<string, number> = {};
  for (const c of companies) {
    stageCounts[c.stage] = (stageCounts[c.stage] ?? 0) + 1;
  }

  return (
    <div>
      <PageHeader
        title="Company Tracker"
        description="Keep tabs on every company in your pipeline."
      />

      {/* ---- Summary strip ---- */}
      <div className="flex flex-wrap gap-3 mb-8">
        <SummaryPill label="Companies" value={companies.length} accent="bg-indigo-500" />
        <SummaryPill
          label="Active"
          value={companies.filter((c) => c.stage !== "researching" && c.stage !== "offer").length}
          accent="bg-amber-500"
        />
        <SummaryPill
          label="Offers"
          value={companies.filter((c) => c.stage === "offer").length}
          accent="bg-emerald-500"
        />
        <SummaryPill
          label="High Priority"
          value={companies.filter((c) => c.priority === "high").length}
          accent="bg-red-500"
        />
      </div>

      {/* ---- Company cards ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {companies.map((c) => {
          const qCount = questions.filter((q) => q.company === c.name).length;

          return (
            <div
              key={c.id}
              className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center gap-3.5 px-5 py-4 border-b border-slate-100">
                <span
                  className={`shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-lg text-sm font-bold ${c.color}`}
                >
                  {c.name[0]}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-slate-900 truncate">
                    {c.name}
                  </h2>
                  <p className="text-[11px] text-slate-400">{c.industry}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${stageStyle[c.stage]}`}
                  >
                    {stageLabel[c.stage]}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${priorityStyle[c.priority]}`}
                  >
                    {priorityLabel[c.priority]}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="px-5 py-4 space-y-3">
                {/* Role row */}
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="h-4 w-4 text-slate-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  <span className="text-slate-700 font-medium">{c.role}</span>
                </div>

                {/* Notes */}
                {c.notes ? (
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    {c.notes}
                  </p>
                ) : (
                  <p className="text-[13px] text-slate-300 italic">
                    No notes yet.
                  </p>
                )}

                {/* Footer meta */}
                <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-400">
                  <span>
                    {qCount} {qCount === 1 ? "question" : "questions"} saved
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function SummaryPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
      <span className={`h-2 w-2 rounded-full ${accent}`} />
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}

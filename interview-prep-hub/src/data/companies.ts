export type InterviewStage =
  | "researching"
  | "applied"
  | "phone-screen"
  | "onsite"
  | "offer";

export type Priority = "low" | "medium" | "high";

export interface Company {
  id: string;
  name: string;
  industry: string;
  color: string;
  role: string;
  stage: InterviewStage;
  priority: Priority;
  notes: string;
}

export const companies: Company[] = [
  {
    id: "amazon",
    name: "Amazon",
    industry: "Cloud & E-Commerce",
    color: "bg-orange-100 text-orange-700",
    role: "SDE Intern",
    stage: "onsite",
    priority: "high",
    notes: "Focus on Leadership Principles. Expect 2 behavioral + 2 coding rounds. Recruiter said results by mid-April.",
  },
  {
    id: "google",
    name: "Google",
    industry: "Search & AI",
    color: "bg-blue-100 text-blue-700",
    role: "SWE Intern",
    stage: "phone-screen",
    priority: "high",
    notes: "Phone screen scheduled for next week. Review dynamic programming and graph problems. Interviewer prefers Python.",
  },
  {
    id: "meta",
    name: "Meta",
    industry: "Social & VR",
    color: "bg-sky-100 text-sky-700",
    role: "Production Engineer Intern",
    stage: "applied",
    priority: "medium",
    notes: "Applied through university portal. Role is systems-heavy — brush up on Linux and networking fundamentals.",
  },
  {
    id: "apple",
    name: "Apple",
    industry: "Hardware & Software",
    color: "bg-gray-100 text-gray-700",
    role: "Software Engineer Intern",
    stage: "researching",
    priority: "medium",
    notes: "Referral from a friend on the iCloud team. Need to tailor resume before applying.",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    industry: "Cloud & Enterprise",
    color: "bg-emerald-100 text-emerald-700",
    role: "Explore Intern",
    stage: "offer",
    priority: "low",
    notes: "Offer received! Deadline to respond is April 20. Team match is Azure DevOps.",
  },
];

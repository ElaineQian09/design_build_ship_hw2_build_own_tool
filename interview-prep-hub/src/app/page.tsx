import Link from "next/link";

const sections = [
  {
    href: "/questions",
    title: "Questions",
    description: "Browse and search interview questions by category and company.",
    icon: "💬",
  },
  {
    href: "/add-question",
    title: "Add Question",
    description: "Contribute new questions from your own interview experiences.",
    icon: "✏️",
  },
  {
    href: "/companies",
    title: "Companies",
    description: "View company profiles and the questions they commonly ask.",
    icon: "🏢",
  },
  {
    href: "/checklist",
    title: "Checklist",
    description: "Track your prep progress with an interactive checklist.",
    icon: "✅",
  },
];

export default function Home() {
  return (
    <div>
      <section className="py-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Welcome to Interview Prep Hub
        </h1>
        <p className="mt-2 text-base text-slate-500 max-w-xl">
          Everything you need to prepare for your next interview — organized,
          searchable, and in one place.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map(({ href, title, description, icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl mt-0.5">{icon}</span>
            <div>
              <h2 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

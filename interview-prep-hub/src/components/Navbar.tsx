"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/questions", label: "Questions" },
  { href: "/questions/new", label: "Add Question" },
  { href: "/companies", label: "Companies" },
  { href: "/checklist", label: "Checklist" },
];

export default function Navbar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    // Exact match for specific routes; prefix match for section roots
    if (href === "/questions/new") return pathname === "/questions/new";
    if (href === "/questions") return pathname.startsWith("/questions") && pathname !== "/questions/new";
    return pathname.startsWith(href);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          <span className="text-indigo-600">IP</span> Hub
        </Link>

        <div className="flex items-center gap-0.5">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

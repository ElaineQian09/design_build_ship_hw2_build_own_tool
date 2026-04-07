import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Interview Prep Hub
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/questions" className="hover:text-gray-900">
            Questions
          </Link>
          <Link href="/tips" className="hover:text-gray-900">
            Tips
          </Link>
          <Link href="/practice" className="hover:text-gray-900">
            Practice
          </Link>
        </div>
      </div>
    </nav>
  );
}

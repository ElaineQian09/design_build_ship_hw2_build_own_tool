export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Interview Prep Hub
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Your one-stop resource for acing technical and behavioral interviews.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/questions"
          className="block rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Questions
          </h2>
          <p className="text-gray-600">
            Browse common interview questions by category.
          </p>
        </a>
        <a
          href="/tips"
          className="block rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tips</h2>
          <p className="text-gray-600">
            Learn strategies to stand out in your interviews.
          </p>
        </a>
        <a
          href="/practice"
          className="block rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Practice
          </h2>
          <p className="text-gray-600">
            Test yourself with mock interview exercises.
          </p>
        </a>
      </div>
    </div>
  );
}

import Header from "@/components/Header";

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header title="IPL 2025 — Teams" currentPage="teams" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Teams</h1>
          <p className="text-xl text-gray-600">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

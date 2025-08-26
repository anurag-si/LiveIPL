import MatchSchedule from "@/components/MatchSchedule";
import Header from "@/components/Header";

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="IPL 2025" currentPage="matches" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <MatchSchedule />
      </div>
    </div>
  );
}

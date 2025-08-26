import PointsTable from "@/components/pointsTable";
import Header from "@/components/Header";

interface PointsPageProps {
  searchParams: { season?: string }
}

export default async function PointsPage({ searchParams }: PointsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="IPL 2025" currentPage="points" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PointsTable searchParams={searchParams} />
      </div>
    </div>
  );
}

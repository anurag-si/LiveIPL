import PointsTable from "@/components/pointsTable";

interface PointsPageProps {
  searchParams: { season?: string }
}

export default async function PointsPage({ searchParams }: PointsPageProps) {
  return <PointsTable searchParams={searchParams} />;
}

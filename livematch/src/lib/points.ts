import type { TeamStanding } from "@/data/pointsTableData2025";

export async function getPointsTableFromApi(baseUrl: string): Promise<TeamStanding[]> {
  const res = await fetch(`/api/pointsTable`, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to fetch points table (status ${res.status}): ${body}`);
  }
  return res.json();
}

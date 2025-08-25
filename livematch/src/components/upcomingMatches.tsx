import { UpcomingMatch } from "@/data/upcomingMatchData";

export default async function UpcomingMatches() {
  const res = await fetch(`../api/upcomingMatches`, {
      cache: "no-store", // always fetch fresh
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch schedule");
    }

    const data: UpcomingMatch[] = await res.json();
    console.log(data, 'data');
    return (
    <div>
      <h2>Upcoming Matches</h2>
      <ul>
        {data?.map((match) => (
          <li key={match.id}>
            {match.matchNumber}: {match.teams.home.name} vs {match.teams.away.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
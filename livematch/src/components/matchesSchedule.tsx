import { MatchScheduleItem } from "@/data/scheduleData";




export default async function UpcomingMatchesSchedule() {
   const res = await fetch(`/api/matchesSchedule`, {
    cache: "no-store", // always fetch fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch schedule");
  }

  const data: MatchScheduleItem[] = await res.json();
    console.log(data, 'data');
    
  return (
    <div>
      <h2>Match Schedule</h2>
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
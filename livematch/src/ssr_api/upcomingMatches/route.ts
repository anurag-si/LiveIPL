import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  // In a real app, you'd fetch this from a database or external API

  const { upcomingMatches } = await import("../../data/upcomingMatchData");
  return new Response(JSON.stringify(upcomingMatches), {
    headers: { "Content-Type": "application/json" },
  });
}
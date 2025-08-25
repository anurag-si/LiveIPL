import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  // In a real app, you'd fetch this from a database or external API
  const { matchSchedule } = await import("../../data/scheduleData");
  return new Response(JSON.stringify(matchSchedule), {
    headers: { "Content-Type": "application/json" },
  });
}
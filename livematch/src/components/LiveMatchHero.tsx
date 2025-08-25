import React from "react"
import { getLiveMatch, MatchScheduleItem } from "@/lib/api"
import LiveMatchData from "./LiveMatchData"

export default async function LiveMatchHero() {
  // Fetch live match data from API (this runs on the server)
  let liveMatch: MatchScheduleItem | null = null
  let error: string | null = null
  
  try {
    liveMatch = await getLiveMatch()
  } catch (err) {
    error = 'Failed to load live match data'
    console.error('Error loading live match:', err)
  }

  const teamLogos: Record<string, string> = {
    PBKS: "/PBKS.png",
    RCB: "/RCB.png",
    GT: "/GT.png",
    MI: "/MI.png",
    DC: "/DC.png",
    SRH: "/SRH.png",
    LSG: "/LSG.png",
    KKR: "/KKR.png",
    RR: "/RR.png",
    CSK: "/CSK.png",
  }

  // If no live match, show upcoming match info
  const displayMatch = liveMatch || {
    id: "upcoming-001",
    matchNumber: "Next Match",
    competition: "TATA IPL 2025",
    status: "upcoming" as const,
    startLocalISO: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    startUTC: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    venue: { stadium: "Wankhede Stadium", city: "Mumbai" },
    teams: { 
      home: { code: "MI", name: "Mumbai Indians", shortName: "MI" },
      away: { code: "CSK", name: "Chennai Super Kings", shortName: "CSK" }
    }
  }

  const isLive = !!liveMatch
  const matchStatus = isLive ? "LIVE" : "UPCOMING"

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Error Loading Live Match</h2>
            <p className="text-red-100 mb-4">{error}</p>
            <p className="text-sm text-red-200">Please refresh the page to try again</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Live Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
            isLive 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-blue-500 text-white'
          }`}>
            {isLive ? '🔥 LIVE NOW' : '⏰ UPCOMING'}
          </div>
        </div>

        {/* Match Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {displayMatch.teams.home.name} vs {displayMatch.teams.away.name}
          </h1>
          <p className="text-xl text-red-100 mb-2">{displayMatch.matchNumber}</p>
          <p className="text-lg text-red-200">{displayMatch.venue.stadium}, {displayMatch.venue.city}</p>
        </div>

        {/* Live Match Data (CSR) */}
        <LiveMatchData
          matchId={displayMatch.id}
          homeTeam={{
            name: displayMatch.teams.home.name,
            shortName: displayMatch.teams.home.shortName,
            code: displayMatch.teams.home.code
          }}
          awayTeam={{
            name: displayMatch.teams.away.name,
            shortName: displayMatch.teams.away.shortName,
            code: displayMatch.teams.away.code
          }}
          isLive={isLive}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button className="px-8 py-3 bg-white text-red-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
            {isLive ? 'Watch Live' : 'Get Tickets'}
          </button>
          <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-red-700 transition-colors font-semibold text-lg">
            Match Details
          </button>
          <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-red-700 transition-colors font-semibold text-lg">
            Team Stats
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-red-100">
          <p className="text-sm">
            {isLive 
              ? 'Follow live updates and commentary' 
              : 'Stay tuned for live coverage'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

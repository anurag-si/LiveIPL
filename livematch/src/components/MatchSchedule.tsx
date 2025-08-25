import React from "react"
import { getMatchSchedule, MatchScheduleItem } from "@/lib/api"
import Header from "./Header"

export default async function MatchSchedule() {
  // Fetch data from API (this runs on the server)
  let matchSchedule: MatchScheduleItem[] = []
  let error: string | null = null
  
  try {
    matchSchedule = await getMatchSchedule()
  } catch (err) {
    error = 'Failed to load match schedule'
    console.error('Error loading match schedule:', err)
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-100 text-red-800 border-red-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "LIVE"
      case "upcoming":
        return "UPCOMING"
      case "completed":
        return "COMPLETED"
      default:
        return status.toUpperCase()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header title="Match Schedule" currentPage="matches" />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">Please refresh the page to try again</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header title="Match Schedule" currentPage="matches" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IPL 2025 Match Schedule</h1>
          <p className="text-gray-600">Complete schedule of all matches with live updates</p>
        </div>

        <div className="grid gap-6">
          {matchSchedule.map((match) => (
            <div key={match.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Match Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(match.status)}`}>
                      {getStatusText(match.status)}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{match.matchNumber}</h3>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(match.startLocalISO)}
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Teams */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                      {/* Home Team */}
                      <div className="flex items-center gap-4">
                        <img
                          src={teamLogos[match.teams.home.code] || "/IPLLOGO.jpg"}
                          alt={`${match.teams.home.name} logo`}
                          className="w-16 h-16 rounded-full border-2 border-gray-200"
                        />
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{match.teams.home.name}</h4>
                          <p className="text-sm text-gray-600">{match.teams.home.shortName}</p>
                        </div>
                      </div>

                      {/* VS */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400">VS</div>
                        <div className="text-xs text-gray-500 mt-1">Match</div>
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <h4 className="text-xl font-bold text-gray-900">{match.teams.away.name}</h4>
                          <p className="text-sm text-gray-600">{match.teams.away.shortName}</p>
                        </div>
                        <img
                          src={teamLogos[match.teams.away.code] || "/IPLLOGO.jpg"}
                          alt={`${match.teams.away.name} logo`}
                          className="w-16 h-16 rounded-full border-2 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Match Info */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-3">Match Details</h5>
                      
                      {/* Venue */}
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Venue</div>
                        <div className="text-sm font-medium text-gray-900">{match.venue.stadium}</div>
                        <div className="text-xs text-gray-600">{match.venue.city}</div>
                      </div>

                      {/* Competition */}
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Competition</div>
                        <div className="text-sm font-medium text-gray-900">{match.competition}</div>
                      </div>

                      {/* Live Score (if available) */}
                      {match.liveScore && (
                        <div className="mb-3">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Live Score</div>
                          <div className="text-sm font-medium text-gray-900">
                            {match.liveScore.batting}: {match.liveScore.runs}/{match.liveScore.wickets}
                          </div>
                          <div className="text-xs text-gray-600">Overs: {match.liveScore.overs}</div>
                        </div>
                      )}

                      {/* Result (if completed) */}
                      {match.result && (
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Result</div>
                          <div className="text-sm font-medium text-gray-900">{match.result}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {matchSchedule.filter(m => m.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {matchSchedule.filter(m => m.status === 'live').length}
              </div>
              <div className="text-sm text-gray-600">Live</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {matchSchedule.filter(m => m.status === 'upcoming').length}
              </div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

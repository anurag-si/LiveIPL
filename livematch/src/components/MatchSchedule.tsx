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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">Please refresh the page to try again</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center sm:text-left">IPL 2025 Match Schedule</h1>
          <p className="text-gray-600 text-center sm:text-left">Complete schedule of all matches with live updates</p>
        </div>

        <div className="grid gap-4 sm:gap-6">
          {matchSchedule.map((match) => (
            <div key={match.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Match Header */}
              <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(match.status)}`}>
                    {getStatusText(match.status)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                    {match.matchNumber}
                  </span>
                </div>
              </div>

              {/* Match Details */}
              <div className="p-3 sm:p-4 lg:p-5">
                {/* Teams Section - Mobile Optimized */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  {/* Home Team */}
                  <div className="text-center flex-1 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 bg-gray-50 rounded-full p-1 sm:p-2 border-2 border-gray-200">
                      <img
                        src={teamLogos[match.teams.home.code] || "/IPLLOGO.jpg"}
                        alt={`${match.teams.home.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-1 px-1">
                      <div className="text-sm font-bold text-gray-800 leading-tight truncate">
                        {match.teams.home.shortName}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight line-clamp-2 h-8 sm:h-10 flex items-center justify-center">
                        {match.teams.home.name}
                      </div>
                    </div>
                  </div>
                  
                  {/* VS Section */}
                  <div className="mx-2 sm:mx-3 lg:mx-4 text-center flex-shrink-0">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-300 mb-1">VS</div>
                    <div className="text-xs text-gray-400 font-medium">Match</div>
                  </div>
                  
                  {/* Away Team */}
                  <div className="text-center flex-1 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 bg-gray-50 rounded-full p-1 sm:p-2 border-2 border-gray-200">
                      <img
                        src={teamLogos[match.teams.away.code] || "/IPLLOGO.jpg"}
                        alt={`${match.teams.away.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-1 px-1">
                      <div className="text-sm font-bold text-gray-800 leading-tight truncate">
                        {match.teams.away.shortName}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight line-clamp-2 h-8 sm:h-10 flex items-center justify-center">
                        {match.teams.away.name}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Match Info */}
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 space-y-2">
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-semibold text-gray-700">
                      {formatDate(match.startLocalISO)}
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-xs text-gray-500 leading-tight line-clamp-1">
                      {match.venue.stadium}
                    </div>
                    <div className="text-xs text-gray-400 leading-tight">
                      {match.venue.city}
                    </div>
                  </div>
                </div>

                {/* Additional Match Details */}
                <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {/* Competition */}
                  <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                    <div className="text-xs text-blue-600 uppercase tracking-wide font-medium">Competition</div>
                    <div className="text-xs sm:text-sm font-medium text-blue-800 truncate">{match.competition}</div>
                  </div>

                  {/* Live Score or Result */}
                  {match.liveScore ? (
                    <div className="bg-green-50 rounded-lg p-2 sm:p-3">
                      <div className="text-xs text-green-600 uppercase tracking-wide font-medium">Live Score</div>
                      <div className="text-xs sm:text-sm font-medium text-green-800">
                        {match.liveScore.batting}: {match.liveScore.runs}/{match.liveScore.wickets}
                      </div>
                      <div className="text-xs text-green-600">Overs: {match.liveScore.overs}</div>
                    </div>
                  ) : match.result ? (
                    <div className="bg-purple-50 rounded-lg p-2 sm:p-3">
                      <div className="text-xs text-purple-600 uppercase tracking-wide font-medium">Result</div>
                      <div className="text-xs sm:text-sm font-medium text-purple-800 truncate">{match.result}</div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">Status</div>
                      <div className="text-xs sm:text-sm font-medium text-gray-800">{getStatusText(match.status)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary - Mobile Optimized */}
        <div className="mt-6 sm:mt-8 bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center sm:text-left">Schedule Summary</h3>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {matchSchedule.filter(m => m.status === 'completed').length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {matchSchedule.filter(m => m.status === 'live').length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Live</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {matchSchedule.filter(m => m.status === 'upcoming').length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Upcoming</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

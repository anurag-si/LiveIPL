import React from "react"
import { getPointsTable, TeamStanding } from "@/lib/api"
import SeasonSelector from "./SeasonSelector"

interface PointsTableProps {
  searchParams: { season?: string }
}

export default async function PointsTable({ searchParams }: PointsTableProps) {
  const season = searchParams?.season || "2025"
  
  // Fetch data from API (this runs on the server)
  let pointsTableData: TeamStanding[] = []
  let error: string | null = null
  
  try {
    pointsTableData = await getPointsTable(season)
  } catch (err) {
    error = 'Failed to load points table data'
    console.error('Error loading points table:', err)
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

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
        <p className="text-red-600">{error}</p>
        <p className="text-sm text-red-500 mt-2">Please refresh the page to try again</p>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Season Selector */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label htmlFor="season" className="text-lg font-medium text-gray-900">
              Select Season:
            </label>
            <SeasonSelector />
          </div>
        </div>

        {/* Points Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-xl font-bold text-white">
              IPL {season} Points Table
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matches
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Won
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lost
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NR
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NRR
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    For
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Against
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Form
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pointsTableData.map((team) => (
                  <React.Fragment key={team.team}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                          team.pos <= 4 
                            ? 'bg-green-100 text-green-800' 
                            : team.pos <= 8 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {team.pos}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full mr-3"
                            src={teamLogos[team.team] || "/IPLLOGO.jpg"}
                            alt={`${team.team} logo`}
                          />
                          <div className="text-sm font-medium text-gray-900">
                            {team.team}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                        {team.matches}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">
                        {team.wins}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-600 font-medium">
                        {team.losses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                        {team.nr}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-mono">
                        <span className={team.nrr >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {team.nrr > 0 ? '+' : ''}{team.nrr.toFixed(3)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 font-mono">
                        {team.for}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 font-mono">
                        {team.against}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {team.points}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex space-x-1 justify-center">
                          {team.recentForm.map((form, index) => (
                            <span
                              key={index}
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                                form === 'W' 
                                  ? 'bg-green-100 text-green-800' 
                                  : form === 'L' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {form}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-green-100 rounded-full mr-2"></span>
              Playoff Qualification
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-yellow-100 rounded-full mr-2"></span>
              Mid Table
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-red-100 rounded-full mr-2"></span>
              Relegation Zone
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import React from "react"
import Header from "./Header"
import Link from "next/link"
import LiveMatchHero from "./LiveMatchHero"
import { getUpcomingMatches, UpcomingMatch } from "@/lib/api"

export default async function HomePage() {
  // Fetch upcoming matches from API (this runs on the server)
  let upcomingMatches: UpcomingMatch[] = []
  let error: string | null = null
  
  try {
    upcomingMatches = await getUpcomingMatches()
    // Take only first 3 upcoming matches for the homepage
    upcomingMatches = upcomingMatches.slice(0, 3)
  } catch (err) {
    error = 'Failed to load upcoming matches'
    console.error('Error loading upcoming matches:', err)
  }

  const quickStats = [
    { label: "Total Teams", value: "10", icon: "🏏" },
    { label: "Season", value: "2025", icon: "📅" },
    { label: "Venues", value: "12", icon: "🏟️" },
    { label: "Format", value: "T20", icon: "⚡" },
  ]

  const topPerformers = [
    { name: "Virat Kohli", team: "RCB", stats: "973 runs", category: "Most Runs" },
    { name: "Yuzvendra Chahal", team: "RR", stats: "195 wickets", category: "Most Wickets" },
    { name: "MS Dhoni", team: "CSK", stats: "5 titles", category: "Most Titles" },
  ]

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header title="IPL 2025" currentPage="home" />
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
      <Header title="IPL 2025" currentPage="home" />
      
      {/* Live Match Hero */}
      <LiveMatchHero />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to IPL 2025
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Experience the thrill of cricket&apos;s biggest festival with live matches, real-time updates, and comprehensive coverage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/matches" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              View Schedule
            </Link>
            <Link 
              href="/points" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              Points Table
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Tournament Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Matches</h2>
            <Link 
              href="/matches" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-sm text-gray-500 mb-2">{match.matchNumber}</div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center flex-1">
                    <div className="font-semibold text-gray-900">{match.teams.home.shortName}</div>
                    <div className="text-sm text-gray-600">{match.teams.home.name}</div>
                  </div>
                  <div className="text-gray-400 mx-4">vs</div>
                  <div className="text-center flex-1">
                    <div className="font-semibold text-gray-900">{match.teams.away.shortName}</div>
                    <div className="text-sm text-gray-600">{match.teams.away.name}</div>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {new Date(match.startLocalISO).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="text-center text-xs text-gray-500 mt-2">
                  {match.venue.stadium}, {match.venue.city}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Top Performers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPerformers.map((performer, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{performer.name}</h3>
                <div className="text-blue-600 font-medium mb-2">{performer.team}</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{performer.stats}</div>
                <div className="text-sm text-gray-600">{performer.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href="/matches" 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📅</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Match Schedule</h3>
              <p className="text-gray-600">View all upcoming and completed matches</p>
            </Link>
            <Link 
              href="/points" 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Points Table</h3>
              <p className="text-gray-600">Check team standings and rankings</p>
            </Link>
            <Link 
              href="/teams" 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Info</h3>
              <p className="text-gray-600">Explore team details and players</p>
            </Link>
            <Link 
              href="/stats" 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Statistics</h3>
              <p className="text-gray-600">View detailed match statistics</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <img src="/IPLLOGO.jpg" alt="IPL Logo" className="h-12 w-auto" />
              <div>
                <h3 className="text-xl font-bold">Indian Premier League</h3>
                <p className="text-gray-400">Cricket&apos;s Biggest Festival</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2025 Indian Premier League</p>
              <p className="text-gray-400">All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import React from 'react';
import { getUpcomingMatches } from '@/lib/api';
import LiveMatchHero from './LiveMatchHero';
import Header from './Header';
import Link from 'next/link';

export default async function HomePage() {
  const upcomingMatches = await getUpcomingMatches();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Always Visible */}
      <Header title="IPL 2025" currentPage="home" />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to IPL 2025
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Experience the thrill of cricket&apos;s biggest festival
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/matches" 
              className="px-8 py-4 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-block text-center"
            >
              View Matches
            </Link>
            <Link 
              href="/points" 
              className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition-colors font-semibold text-lg inline-block text-center"
            >
              Points Table
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Live Match Hero - Always Visible */}
        <LiveMatchHero />

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10</div>
            <div className="text-gray-600">Teams</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">74</div>
            <div className="text-gray-600">Matches</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
            <div className="text-gray-600">Months</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">1</div>
            <div className="text-gray-600">Champion</div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Matches</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches?.slice(0, 6).map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{match.matchNumber}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {match.status}
                  </span>
                </div>
                
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center space-x-4 mb-3">
                    <div className="text-center">
                      <img
                        src={`/${match.teams.home.code}.png`}
                        alt={match.teams.home.name}
                        className="w-12 h-12 mx-auto mb-2"
                      />
                      <div className="text-sm font-medium">{match.teams.home.shortName}</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-400">vs</div>
                    <div className="text-center">
                      <img
                        src={`/${match.teams.away.code}.png`}
                        alt={match.teams.away.name}
                        className="w-12 h-12 mx-auto mb-2"
                      />
                      <div className="text-sm font-medium">{match.teams.away.shortName}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {new Date(match.startLocalISO).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {match.venue.stadium}, {match.venue.city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Performers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🏏 Leading Run Scorer</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">Virat Kohli</div>
                <div className="text-gray-600">RCB • 973 runs</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Leading Wicket Taker</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Yuzvendra Chahal</div>
                <div className="text-gray-600">RR • 195 wickets</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🏆 Most Valuable Player</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">Andre Russell</div>
                <div className="text-gray-600">KKR • 2019 MVP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/matches" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📅</div>
              <div className="text-lg font-semibold text-gray-800">Match Schedule</div>
            </Link>
            
            <Link href="/points" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <div className="text-lg font-semibold text-gray-800">Points Table</div>
            </Link>
            
            <Link href="/teams" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <div className="text-lg font-semibold text-gray-800">Team Profiles</div>
            </Link>
            
            <Link href="/stats" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📈</div>
              <div className="text-lg font-semibold text-gray-800">Statistics</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/IPLLOGO.jpg"
              alt="IPL Logo"
              className="h-16 w-auto"
            />
          </div>
          <p className="text-gray-300 mb-4">
            © 2025 Indian Premier League. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Experience the excitement of cricket&apos;s biggest festival
          </p>
        </div>
      </footer>
    </div>
  );
}

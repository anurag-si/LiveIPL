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
      
      {/* Hero Section - Mobile Optimized */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Welcome to IPL 2025
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 px-4 max-w-3xl mx-auto leading-relaxed">
            Experience the thrill of cricket&apos;s biggest festival
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link 
              href="/matches" 
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-base sm:text-lg inline-block text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              View Matches
            </Link>
            <Link 
              href="/points" 
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition-colors font-semibold text-base sm:text-lg inline-block text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Points Table
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Live Match Hero - Always Visible */}
        <div className="mb-8 sm:mb-12">
          <LiveMatchHero />
        </div>

        {/* Quick Stats - Mobile Optimized Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">10</div>
            <div className="text-sm sm:text-base text-gray-600">Teams</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">74</div>
            <div className="text-sm sm:text-base text-gray-600">Matches</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">2</div>
            <div className="text-sm sm:text-base text-gray-600">Months</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">1</div>
            <div className="text-sm sm:text-base text-gray-600">Champion</div>
          </div>
        </div>

        {/* Upcoming Matches - Mobile Optimized */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">Upcoming Matches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {upcomingMatches?.slice(0, 6).map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">{match.matchNumber}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    {match.status}
                  </span>
                </div>
                
                <div className="text-center mb-3 sm:mb-4">
                  <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3">
                    <div className="text-center flex-1">
                      <img
                        src={`/${match.teams.home.code}.png`}
                        alt={match.teams.home.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2"
                      />
                      <div className="text-sm font-medium text-gray-800 leading-tight">{match.teams.home.shortName}</div>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-400 px-2">vs</div>
                    <div className="text-center flex-1">
                      <img
                        src={`/${match.teams.away.code}.png`}
                        alt={match.teams.away.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2"
                      />
                      <div className="text-sm font-medium text-gray-800 leading-tight">{match.teams.away.shortName}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 font-medium">
                    {new Date(match.startLocalISO).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 leading-tight">
                    {match.venue.stadium}, {match.venue.city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers - Mobile Optimized */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">Top Performers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center">🏏 Leading Run Scorer</h3>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">Virat Kohli</div>
                <div className="text-sm sm:text-base text-gray-600">RCB • 973 runs</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center">🎯 Leading Wicket Taker</h3>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">Yuzvendra Chahal</div>
                <div className="text-sm sm:text-base text-gray-600">RR • 195 wickets</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center">🏆 Most Valuable Player</h3>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">Andre Russell</div>
                <div className="text-sm sm:text-base text-gray-600">KKR • 2019 MVP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <Link href="/matches" className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow hover:scale-105 transform transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📅</div>
              <div className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight">Match Schedule</div>
            </Link>
            
            <Link href="/points" className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow hover:scale-105 transform transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📊</div>
              <div className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight">Points Table</div>
            </Link>
            
            <Link href="/teams" className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow hover:scale-105 transform transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">👥</div>
              <div className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight">Team Profiles</div>
            </Link>
            
            <Link href="/stats" className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow hover:scale-105 transform transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📈</div>
              <div className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight">Statistics</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-800 text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <img
              src="/IPLLOGO.jpg"
              alt="IPL Logo"
              className="h-12 sm:h-16 w-auto"
            />
          </div>
          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
            © 2025 Indian Premier League. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Experience the excitement of cricket&apos;s biggest festival
          </p>
        </div>
      </footer>
    </div>
  );
}

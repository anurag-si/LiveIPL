import React from 'react';
import { getUpcomingMatches } from '@/lib/api';
import LiveMatchHero from './LiveMatchHero';
import Header from './Header';
import Link from 'next/link';

export default async function HomePage() {
  const upcomingMatches = await getUpcomingMatches();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="IPL 2025" currentPage="home" />
      
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
        <div className="mb-8 sm:mb-12">
          <LiveMatchHero />
        </div>

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

        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">Upcoming Matches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {upcomingMatches?.slice(0, 6).map((match) => (
              <div key={match.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                {/* Match Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 sm:px-4 sm:py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full truncate max-w-20">
                      {match.matchNumber}
                    </span>
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {match.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 lg:p-5">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    {/* Home Team */}
                    <div className="text-center flex-1 min-w-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 bg-gray-50 rounded-full p-1 sm:p-2 border-2 border-gray-200">
                        <img
                          src={`/${match.teams.home.code}.png`}
                          alt={match.teams.home.name}
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
                    
                    <div className="mx-2 sm:mx-3 lg:mx-4 text-center flex-shrink-0">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-300 mb-1">VS</div>
                      <div className="text-xs text-gray-400 font-medium">Match</div>
                    </div>
                    
                    <div className="text-center flex-1 min-w-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 bg-gray-50 rounded-full p-1 sm:p-2 border-2 border-gray-200">
                        <img
                          src={`/${match.teams.away.code}.png`}
                          alt={match.teams.away.name}
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
                  
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 space-y-2">
                    <div className="flex items-center justify-center">
                      <div className="text-sm font-semibold text-gray-700">
                        {new Date(match.startLocalISO).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
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
                </div>
              </div>
            ))}
          </div>
        </div>

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

        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <Link href="/matches" className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 transform hover:border-blue-200 group">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📅</div>
              <div className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">Match Schedule</div>
            </Link>
            
            <Link href="/points" className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 transform hover:border-blue-200 group">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📊</div>
              <div className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">Points Table</div>
            </Link>
            
            <Link href="/teams" className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 transform hover:border-blue-200 group">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">👥</div>
              <div className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">Team Profiles</div>
            </Link>
            
            <Link href="/stats" className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 transform hover:border-blue-200 group">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📈</div>
              <div className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">Statistics</div>
            </Link>
          </div>
        </div>
      </div>

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

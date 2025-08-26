import React from 'react';
import LiveMatchData from './LiveMatchData';
import { getLiveMatch } from '@/lib/api';

export default async function LiveMatchHero() {
  const liveMatch = await getLiveMatch();

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
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🏏 Live Match</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">LIVE</span>
        </div>
      </div>

      {liveMatch ? (
        <div className="space-y-4">
          <LiveMatchData 
            matchId={liveMatch.id}
            homeTeam={{
              name: liveMatch.teams.home.name,
              shortName: liveMatch.teams.home.shortName,
              code: liveMatch.teams.home.code
            }}
            awayTeam={{
              name: liveMatch.teams.away.name,
              shortName: liveMatch.teams.away.shortName,
              code: liveMatch.teams.away.code
            }}
            isLive={true}
          />
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🏏</div>
          <h3 className="text-xl font-semibold mb-2">No Live Match Currently</h3>
          <p className="text-blue-100">Check back later for live IPL action!</p>
        </div>
      )}
    </div>
  );
}

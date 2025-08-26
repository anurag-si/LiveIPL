"use client"

import React, { useState, useEffect } from "react"

interface LiveMatchDataProps {
  matchId: string
  homeTeam: {
    name: string
    shortName: string
    code: string
  }
  awayTeam: {
    name: string
    shortName: string
    code: string
  }
  isLive: boolean
}

export default function LiveMatchData({ matchId, homeTeam, awayTeam, isLive }: LiveMatchDataProps) {
  const [liveData, setLiveData] = useState({
    homeTeam: {
      score: "0/0",
      overs: "0.0",
      runRate: "0.00",
      topBatsman: "Yet to bat",
      topBowler: "Yet to bowl"
    },
    awayTeam: {
      score: "0/0",
      overs: "0.0",
      runRate: "0.00",
      topBatsman: "Yet to bat",
      topBowler: "Yet to bowl"
    },
    currentInnings: "Match starts soon",
    timeRemaining: "Starts in 2 hours",
    toss: "Toss in 1 hour",
    weather: "Partly Cloudy, 28°C",
    pitch: "Good batting surface, 180-200 expected"
  })

  // Simulate real-time updates for live matches
  useEffect(() => {
    if (!isLive) return

    // Initial live data
    const initialLiveData = {
      homeTeam: {
        score: "156/4",
        overs: "18.2",
        runRate: "8.52",
        topBatsman: "Virat Kohli 67(45)",
        topBowler: "Jasprit Bumrah 2/24"
      },
      awayTeam: {
        score: "142/6",
        overs: "20.0",
        runRate: "7.10",
        topBatsman: "Rohit Sharma 45(32)",
        topBowler: "Rashid Khan 3/28"
      },
      currentInnings: `${homeTeam.shortName} Batting`,
      timeRemaining: "2.4 overs remaining",
      toss: `${homeTeam.shortName} won the toss and chose to bat`,
      weather: "Partly Cloudy, 28°C",
      pitch: "Good batting surface, 180-200 expected"
    }

    setLiveData(initialLiveData)

    // Simulate live updates every 30 seconds
    const interval = setInterval(() => {
      setLiveData(prev => {
        // Simulate score updates
        const homeScore = prev.homeTeam.score.split('/')
        const homeRuns = parseInt(homeScore[0])
        const homeWickets = parseInt(homeScore[1])
        
        // Random score updates
        const newRuns = homeRuns + Math.floor(Math.random() * 5) + 1
        const newWickets = homeWickets + (Math.random() > 0.9 ? 1 : 0)
        
        return {
          ...prev,
          homeTeam: {
            ...prev.homeTeam,
            score: `${newRuns}/${newWickets}`,
            overs: "19.1", // Simulate over progression
            runRate: (newRuns / 19.1).toFixed(2)
          },
          timeRemaining: "1.5 overs remaining"
        }
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [isLive, homeTeam.shortName])

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`/${homeTeam.code}.png`}
            alt={`${homeTeam.name} logo`}
            className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold">{homeTeam.name}</h2>
            <p className="text-red-100">{homeTeam.shortName}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400">
              {liveData.homeTeam.score}
            </div>
            <div className="text-lg text-red-100">
              {liveData.homeTeam.overs} overs
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-red-200">Run Rate</div>
              <div className="font-semibold">{liveData.homeTeam.runRate}</div>
            </div>
            <div>
              <div className="text-red-200">Top Batsman</div>
              <div className="font-semibold text-xs">{liveData.homeTeam.topBatsman}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`/${awayTeam.code}.png`}
            alt={`${awayTeam.name} logo`}
            className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold">{awayTeam.name}</h2>
            <p className="text-red-100">{awayTeam.shortName}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400">
              {liveData.awayTeam.score}
            </div>
            <div className="text-lg text-red-100">
              {liveData.awayTeam.overs} overs
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-red-200">Run Rate</div>
              <div className="font-semibold">{liveData.awayTeam.runRate}</div>
            </div>
            <div>
              <div className="text-red-200">Top Bowler</div>
              <div className="font-semibold text-xs">{liveData.awayTeam.topBowler}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 text-yellow-400">Match Status</h3>
            <p className="text-sm">{liveData.currentInnings}</p>
            <p className="text-xs text-red-200 mt-1">{liveData.timeRemaining}</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 text-yellow-400">Toss</h3>
            <p className="text-sm">{liveData.toss}</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 text-yellow-400">Conditions</h3>
            <p className="text-sm">{liveData.weather}</p>
            <p className="text-xs text-red-200 mt-1">{liveData.pitch}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const express = require('express');
const router = express.Router();
const { getLiveMatch } = require('../data/matchScheduleData');

// Get current live match
router.get('/', (req, res) => {
  try {
    const liveMatch = getLiveMatch();
    
    if (!liveMatch) {
      return res.json({
        success: true,
        data: null,
        message: 'No live match currently',
        nextMatch: {
          message: 'Check upcoming matches for the next game',
          endpoint: '/api/upcoming-matches'
        }
      });
    }
    
    res.json({
      success: true,
      data: liveMatch,
      message: 'Live match retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve live match',
      message: error.message
    });
  }
});

// Get live match status
router.get('/status', (req, res) => {
  try {
    const liveMatch = getLiveMatch();
    
    if (!liveMatch) {
      return res.json({
        success: true,
        data: {
          isLive: false,
          message: 'No live match currently'
        }
      });
    }
    
    res.json({
      success: true,
      data: {
        isLive: true,
        matchId: liveMatch.id,
        matchNumber: liveMatch.matchNumber,
        teams: liveMatch.teams,
        venue: liveMatch.venue,
        liveScore: liveMatch.liveScore
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve live match status',
      message: error.message
    });
  }
});

// Get live match score
router.get('/score', (req, res) => {
  try {
    const liveMatch = getLiveMatch();
    
    if (!liveMatch) {
      return res.json({
        success: true,
        data: null,
        message: 'No live match currently'
      });
    }
    
    res.json({
      success: true,
      data: {
        matchId: liveMatch.id,
        matchNumber: liveMatch.matchNumber,
        teams: liveMatch.teams,
        liveScore: liveMatch.liveScore,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve live match score',
      message: error.message
    });
  }
});

// Get live match team information
router.get('/teams', (req, res) => {
  try {
    const liveMatch = getLiveMatch();
    
    if (!liveMatch) {
      return res.json({
        success: true,
        data: null,
        message: 'No live match currently'
      });
    }
    
    res.json({
      success: true,
      data: {
        matchId: liveMatch.id,
        matchNumber: liveMatch.matchNumber,
        homeTeam: liveMatch.teams.home,
        awayTeam: liveMatch.teams.away,
        venue: liveMatch.venue
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve live match teams',
      message: error.message
    });
  }
});

// Get live match venue information
router.get('/venue', (req, res) => {
  try {
    const liveMatch = getLiveMatch();
    
    if (!liveMatch) {
      return res.json({
        success: true,
        data: null,
        message: 'No live match currently'
      });
    }
    
    res.json({
      success: true,
      data: {
        matchId: liveMatch.id,
        matchNumber: liveMatch.matchNumber,
        venue: liveMatch.venue,
        startTime: liveMatch.startLocalISO
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve live match venue',
      message: error.message
    });
  }
});

// for testing
router.get('/simulate', (req, res) => {
  try {
    const liveMatch = getLiveMatch();
    
    if (!liveMatch) {
      return res.json({
        success: true,
        data: null,
        message: 'No live match currently to simulate'
      });
    }
    
    const simulatedData = {
      matchId: liveMatch.id,
      matchNumber: liveMatch.matchNumber,
      teams: liveMatch.teams,
      venue: liveMatch.venue,
      liveScore: {
        ...liveMatch.liveScore,
        runs: liveMatch.liveScore.runs + Math.floor(Math.random() * 10),
        overs: "15.2",
        batting: liveMatch.liveScore.batting
      },
      additionalInfo: {
        currentBatsman: "Player A",
        currentBowler: "Player B",
        lastBall: "1 run",
        requiredRunRate: "8.5",
        matchStatus: "In Progress"
      },
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: simulatedData,
      message: 'Live match simulation data generated successfully',
      note: 'This is simulated data for testing purposes'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to simulate live match data',
      message: error.message
    });
  }
});

module.exports = router;

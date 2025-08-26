const express = require('express');
const router = express.Router();
const { 
  getMatchSchedule, 
  getLiveMatch, 
  getUpcomingMatches, 
  getCompletedMatches 
} = require('../data/matchScheduleData');

// Get all matches
router.get('/', (req, res) => {
  try {
    const matches = getMatchSchedule();
    
    res.json({
      success: true,
      data: {
        totalMatches: matches.length,
        matches
      },
      message: 'Match schedule retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve match schedule',
      message: error.message
    });
  }
});

// Get live match
router.get('/live', (req, res) => {
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

// Get upcoming matches
router.get('/upcoming', (req, res) => {
  try {
    const upcomingMatches = getUpcomingMatches();
    
    res.json({
      success: true,
      data: {
        totalUpcoming: upcomingMatches.length,
        matches: upcomingMatches
      },
      message: 'Upcoming matches retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve upcoming matches',
      message: error.message
    });
  }
});

// Get completed matches
router.get('/completed', (req, res) => {
  try {
    const completedMatches = getCompletedMatches();
    
    res.json({
      success: true,
      data: {
        totalCompleted: completedMatches.length,
        matches: completedMatches
      },
      message: 'Completed matches retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve completed matches',
      message: error.message
    });
  }
});

// Get matches by status
router.get('/status/:status', (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ['live', 'upcoming', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
        message: 'Status must be one of: live, upcoming, completed'
      });
    }
    
    let matches;
    switch (status) {
      case 'live':
        matches = getLiveMatch();
        break;
      case 'upcoming':
        matches = getUpcomingMatches();
        break;
      case 'completed':
        matches = getCompletedMatches();
        break;
    }
    
    res.json({
      success: true,
      data: {
        status,
        totalMatches: Array.isArray(matches) ? matches.length : (matches ? 1 : 0),
        matches: Array.isArray(matches) ? matches : (matches ? [matches] : [])
      },
      message: `${status} matches retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve matches by status',
      message: error.message
    });
  }
});

// Get specific match by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const matches = getMatchSchedule();
    const match = matches.find(m => m.id === id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found',
        message: `No match found with ID: ${id}`
      });
    }
    
    res.json({
      success: true,
      data: match,
      message: 'Match retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve match',
      message: error.message
    });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  getUpcomingMatches, 
  getUpcomingMatchesByTeam, 
  getUpcomingMatchesByVenue 
} = require('../data/upcomingMatchData');

// GET /api/upcoming-matches - Get all upcoming matches
router.get('/', (req, res) => {
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

// GET /api/upcoming-matches/team/:teamCode - Get upcoming matches for a specific team
router.get('/team/:teamCode', (req, res) => {
  try {
    const { teamCode } = req.params;
    const validTeamCodes = ['MI', 'CSK', 'RCB', 'KKR', 'SRH', 'DC', 'RR', 'PBKS', 'GT', 'LSG'];
    
    if (!validTeamCodes.includes(teamCode.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid team code',
        message: 'Team code must be one of: MI, CSK, RCB, KKR, SRH, DC, RR, PBKS, GT, LSG'
      });
    }
    
    const teamMatches = getUpcomingMatchesByTeam(teamCode.toUpperCase());
    
    res.json({
      success: true,
      data: {
        teamCode: teamCode.toUpperCase(),
        totalMatches: teamMatches.length,
        matches: teamMatches
      },
      message: `Upcoming matches for team ${teamCode.toUpperCase()} retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve team matches',
      message: error.message
    });
  }
});

// GET /api/upcoming-matches/venue/:venue - Get upcoming matches at a specific venue
router.get('/venue/:venue', (req, res) => {
  try {
    const { venue } = req.params;
    
    if (!venue || venue.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Venue parameter required',
        message: 'Please provide a venue name'
      });
    }
    
    const venueMatches = getUpcomingMatchesByVenue(venue);
    
    res.json({
      success: true,
      data: {
        venue: venue.trim(),
        totalMatches: venueMatches.length,
        matches: venueMatches
      },
      message: `Upcoming matches at venue '${venue.trim()}' retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve venue matches',
      message: error.message
    });
  }
});

// GET /api/upcoming-matches/next/:count - Get next N upcoming matches
router.get('/next/:count', (req, res) => {
  try {
    const { count } = req.params;
    const countNum = parseInt(count);
    
    if (isNaN(countNum) || countNum <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid count parameter',
        message: 'Count must be a positive number'
      });
    }
    
    const allUpcoming = getUpcomingMatches();
    const nextMatches = allUpcoming.slice(0, countNum);
    
    res.json({
      success: true,
      data: {
        requestedCount: countNum,
        actualCount: nextMatches.length,
        matches: nextMatches
      },
      message: `Next ${nextMatches.length} upcoming matches retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve next matches',
      message: error.message
    });
  }
});

// GET /api/upcoming-matches/search - Search upcoming matches with query parameters
router.get('/search', (req, res) => {
  try {
    const { team, venue, date } = req.query;
    let matches = getUpcomingMatches();
    
    // Filter by team if specified
    if (team) {
      const validTeamCodes = ['MI', 'CSK', 'RCB', 'KKR', 'SRH', 'DC', 'RR', 'PBKS', 'GT', 'LSG'];
      if (validTeamCodes.includes(team.toUpperCase())) {
        matches = matches.filter(match => 
          match.teams.home.code === team.toUpperCase() || 
          match.teams.away.code === team.toUpperCase()
        );
      }
    }
    
    // Filter by venue if specified
    if (venue) {
      matches = matches.filter(match => 
        match.venue.stadium.toLowerCase().includes(venue.toLowerCase()) ||
        match.venue.city.toLowerCase().includes(venue.toLowerCase())
      );
    }
    
    // Filter by date if specified (basic date filtering)
    if (date) {
      const searchDate = new Date(date);
      if (!isNaN(searchDate.getTime())) {
        matches = matches.filter(match => {
          const matchDate = new Date(match.startLocalISO);
          return matchDate.toDateString() === searchDate.toDateString();
        });
      }
    }
    
    res.json({
      success: true,
      data: {
        filters: { team, venue, date },
        totalMatches: matches.length,
        matches
      },
      message: 'Upcoming matches search completed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search upcoming matches',
      message: error.message
    });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { getPointsTableData, availableSeasons } = require('../data/pointsTableData');

// GET /api/points-table - Get points table for a specific season
router.get('/', (req, res) => {
  try {
    const { season = '2025' } = req.query;
    const pointsTable = getPointsTableData(season);
    
    res.json({
      success: true,
      data: {
        season,
        pointsTable,
        availableSeasons
      },
      message: `Points table for IPL ${season} retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve points table',
      message: error.message
    });
  }
});

// GET /api/points-table/seasons - Get available seasons
router.get('/seasons', (req, res) => {
  try {
    res.json({
      success: true,
      data: availableSeasons,
      message: 'Available seasons retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve seasons',
      message: error.message
    });
  }
});

// GET /api/points-table/:season - Get points table for a specific season
router.get('/:season', (req, res) => {
  try {
    const { season } = req.params;
    const pointsTable = getPointsTableData(season);
    
    if (!pointsTable) {
      return res.status(404).json({
        success: false,
        error: 'Season not found',
        message: `No data available for IPL ${season}`
      });
    }
    
    res.json({
      success: true,
      data: {
        season,
        pointsTable
      },
      message: `Points table for IPL ${season} retrieved successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve points table',
      message: error.message
    });
  }
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const pointsTableRoutes = require('./routes/pointsTable');
const matchScheduleRoutes = require('./routes/matchSchedule');
const upcomingMatchesRoutes = require('./routes/upcomingMatches');
const liveMatchRoutes = require('./routes/liveMatch');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/points-table', pointsTableRoutes);
app.use('/api/match-schedule', matchScheduleRoutes);
app.use('/api/upcoming-matches', upcomingMatchesRoutes);
app.use('/api/live-match', liveMatchRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'IPL Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to IPL Backend API',
    version: '1.0.0',
    endpoints: {
      pointsTable: '/api/points-table',
      matchSchedule: '/api/match-schedule',
      upcomingMatches: '/api/upcoming-matches',
      liveMatch: '/api/live-match'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Points Table: http://localhost:${PORT}/api/points-table`);
  console.log(`Match Schedule: http://localhost:${PORT}/api/match-schedule`);
  console.log(`Upcoming Matches: http://localhost:${PORT}/api/upcoming-matches`);
  console.log(`Live Match: http://localhost:${PORT}/api/live-match`);
});

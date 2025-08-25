# IPL Live Match Backend API

A Node.js backend API for the IPL Live Match application that provides endpoints for points table, match schedules, upcoming matches, and live match data.

## Features

- **Points Table API**: Get IPL points table data for different seasons (2023, 2024, 2025)
- **Match Schedule API**: Retrieve complete match schedules with live, upcoming, and completed matches
- **Upcoming Matches API**: Get upcoming matches with filtering by team, venue, and search capabilities
- **Live Match API**: Real-time live match data and status updates
- **RESTful Design**: Clean, consistent API endpoints with proper error handling
- **CORS Enabled**: Cross-origin resource sharing for frontend integration
- **Security**: Helmet.js for security headers and input validation

## API Endpoints

### Points Table
- `GET /api/points-table` - Get points table for a specific season
- `GET /api/points-table/seasons` - Get available seasons
- `GET /api/points-table/:season` - Get points table for a specific season

### Match Schedule
- `GET /api/match-schedule` - Get all matches
- `GET /api/match-schedule/live` - Get current live match
- `GET /api/match-schedule/upcoming` - Get upcoming matches
- `GET /api/match-schedule/completed` - Get completed matches
- `GET /api/match-schedule/status/:status` - Get matches by status
- `GET /api/match-schedule/:id` - Get specific match by ID

### Upcoming Matches
- `GET /api/upcoming-matches` - Get all upcoming matches
- `GET /api/upcoming-matches/team/:teamCode` - Get matches for a specific team
- `GET /api/upcoming-matches/venue/:venue` - Get matches at a specific venue
- `GET /api/upcoming-matches/next/:count` - Get next N upcoming matches
- `GET /api/upcoming-matches/search` - Search matches with filters

### Live Match
- `GET /api/live-match` - Get current live match
- `GET /api/live-match/status` - Get live match status
- `GET /api/live-match/score` - Get live match score
- `GET /api/live-match/teams` - Get live match team information
- `GET /api/live-match/venue` - Get live match venue information
- `GET /api/live-match/simulate` - Simulate live match data updates

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
```

## Usage Examples

### Get Points Table for 2025
```bash
curl http://localhost:5000/api/points-table?season=2025
```

### Get Live Match
```bash
curl http://localhost:5000/api/live-match
```

### Get Upcoming Matches for RCB
```bash
curl http://localhost:5000/api/upcoming-matches/team/RCB
```

### Search Matches
```bash
curl "http://localhost:5000/api/upcoming-matches/search?team=MI&venue=Mumbai"
```

## Data Structure

### Points Table
```json
{
  "pos": 1,
  "team": "GT",
  "matches": 14,
  "wins": 9,
  "losses": 5,
  "nr": 0,
  "nrr": 0.254,
  "for": "2684/271.5",
  "against": "2639/274.2",
  "points": 18,
  "recentForm": ["L", "L", "W", "W", "W"]
}
```

### Match Schedule
```json
{
  "id": "ipl2025-001",
  "matchNumber": "Match 1",
  "competition": "TATA IPL 2025",
  "status": "completed",
  "startLocalISO": "2025-08-15T19:30:00+05:30",
  "venue": {
    "stadium": "Wankhede Stadium",
    "city": "Mumbai"
  },
  "teams": {
    "home": { "code": "MI", "name": "Mumbai Indians", "shortName": "MI" },
    "away": { "code": "CSK", "name": "Chennai Super Kings", "shortName": "CSK" }
  }
}
```

## Team Codes

- **MI** - Mumbai Indians
- **CSK** - Chennai Super Kings
- **RCB** - Royal Challengers Bengaluru
- **KKR** - Kolkata Knight Riders
- **SRH** - Sunrisers Hyderabad
- **DC** - Delhi Capitals
- **RR** - Rajasthan Royals
- **PBKS** - Punjab Kings
- **GT** - Gujarat Titans
- **LSG** - Lucknow Super Giants

## Development

### Project Structure
```
backend/
├── src/
│   ├── data/           # Data files
│   ├── routes/         # API route handlers
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── server.js       # Main server file
├── package.json
└── README.md
```

### Adding New Data
1. Create data file in `src/data/`
2. Export functions for data retrieval
3. Create corresponding route in `src/routes/`
4. Add route to `server.js`

### Testing
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test root endpoint
curl http://localhost:5000/
```

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue in the repository.

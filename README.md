# IPL Live Match - Full Stack Application

A comprehensive IPL (Indian Premier League) live match application built with Next.js frontend and Node.js backend, featuring real-time match updates, points tables, match schedules, and team information.

## 🏏 Features

### Frontend (Next.js)
- **Live Match Dashboard**: Real-time match updates with dynamic scoring
- **Points Table**: Season-wise team standings with interactive season selection
- **Match Schedule**: Complete tournament schedule with filtering options
- **Team Information**: Team logos and details
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Server-Side Rendering**: Optimized performance with Next.js App Router

### Backend (Node.js)
- **RESTful API**: Complete data endpoints for all IPL information
- **Data Management**: Centralized data handling for points, schedules, and matches
- **Health Monitoring**: API health checks and error handling
- **CORS Support**: Cross-origin resource sharing enabled

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, Helmet, Morgan
- **Deployment**: Railway

## 📁 Project Structure

```
liveMatch/
├── livematch/                 # Frontend (Next.js)
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── api/          # API routes
│   │   │   ├── points/       # Points table page
│   │   │   ├── matches/      # Match schedule page
│   │   │   ├── teams/        # Teams page
│   │   │   └── stats/        # Stats page
│   │   ├── components/       # React components
│   │   │   ├── Header.tsx    # Navigation header
│   │   │   ├── HomePage.tsx  # Landing page
│   │   │   ├── LiveMatchHero.tsx # Live match display
│   │   │   ├── PointsTable.tsx   # Points table
│   │   │   ├── MatchSchedule.tsx # Match schedule
│   │   │   └── SeasonSelector.tsx # Season dropdown
│   │   ├── lib/              # Utilities
│   │   │   └── api.ts        # API service functions
│   │   └── types/            # TypeScript type definitions
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies
├── backend/                   # Backend (Node.js)
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── data/             # Data files
│   │   └── server.js         # Express server
│   ├── package.json          # Backend dependencies
│   └── env.example           # Environment variables template
└── README.md                 # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Frontend Setup
```bash
cd livematch
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Environment Variables

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
```

#### Backend (.env)
```bash
PORT=5001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

## 🌐 API Endpoints

### Base URL
```
https://liveipl-production.up.railway.app/api
```

### Available Endpoints
- `GET /health` - API health check
- `GET /points-table/:season` - Points table for specific season
- `GET /seasons` - Available seasons
- `GET /match-schedule` - Complete match schedule
- `GET /upcoming-matches` - Upcoming matches
- `GET /live-match` - Current live match data
- `GET /live-match/status` - Live match status
- `GET /live-match/score` - Live match score

## 📱 Pages & Routes

- `/` - Home page with live match hero and quick stats
- `/points` - Points table with season selection
- `/matches` - Complete match schedule
- `/teams` - Team information (placeholder)
- `/stats` - Player statistics (placeholder)

## 🎨 UI Components

### Core Components
- **Header**: Navigation with IPL logo and mobile menu
- **LiveMatchHero**: Prominent live match display
- **PointsTable**: Interactive points table with season filtering
- **MatchSchedule**: Responsive match cards
- **SeasonSelector**: Client-side season dropdown

### Design Features
- Light theme with IPL branding
- Mobile-first responsive design
- Tailwind CSS utilities
- Smooth navigation transitions

## 🔄 Data Flow

1. **Frontend** makes API calls to backend endpoints
2. **Backend** serves data from centralized data files
3. **Real-time updates** simulated on frontend for live matches
4. **Server-side rendering** for static content
5. **Client-side hydration** for interactive elements

## 🚀 Deployment

### Frontend (Vercel)
- Automatic deployment from GitHub
- Environment variables configured in Vercel dashboard
- Optimized for Next.js performance

### Backend (Railway)
- Node.js application deployment
- Environment variables configured in Railway dashboard
- Automatic scaling and monitoring

## 🧪 Development

### Running Locally
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd livematch
npm run dev
```

### Build Commands
```bash
# Frontend
npm run build
npm start

# Backend
npm start
```

## 📊 Data Sources

- **Points Table**: Season-wise team standings
- **Match Schedule**: Complete tournament fixtures
- **Upcoming Matches**: Next scheduled matches
- **Live Match Data**: Simulated real-time updates
- **Team Logos**: Local PNG assets

## 🔧 Configuration

### Next.js Config
- App Router enabled
- TypeScript support
- Tailwind CSS integration
- Build optimizations

### Express.js Config
- CORS enabled
- Security headers (Helmet)
- Request logging (Morgan)
- Error handling middleware

## 🐛 Troubleshooting

### Common Issues
1. **API Connection Errors**: Check `NEXT_PUBLIC_API_URL` environment variable
2. **Build Failures**: Ensure backend is accessible during build
3. **Hydration Errors**: Check for server/client component mismatches
4. **Image Loading**: Verify image paths in public directory

### Debug Commands
```bash
# Check API health
curl https://liveipl-production.up.railway.app/api/health

# Check frontend build
npm run build

# Check backend logs
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes.

## 🔗 Links

- **Live Demo**: [Frontend](https://live-ipl.vercel.app/)
- **Backend API**: [Railway](https://liveipl-production.up.railway.app/)
- **Repository**: [GitHub](https://github.com/yourusername/liveMatch)

---

Built with ❤️ for IPL Cricket Fans

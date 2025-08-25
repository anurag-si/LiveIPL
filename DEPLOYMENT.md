# 🚀 IPL Live Match App - Deployment Guide

## 📋 Prerequisites
- ✅ GitHub repository created: https://github.com/anurag-si/LiveIPL.git
- ✅ Code pushed to GitHub
- ✅ Node.js and npm installed locally

## 🌐 Step 1: Deploy Backend to Railway

### 1.1 Go to Railway
- Visit [railway.app](https://railway.app)
- Sign up with your GitHub account

### 1.2 Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your `LiveIPL` repository

### 1.3 Configure Backend
- **Root Directory**: `backend`
- **Environment Variables**:
  ```
  PORT=5001
  NODE_ENV=production
  ```

### 1.4 Deploy
- Click "Deploy"
- Wait for deployment to complete
- Copy your Railway URL (e.g., `https://your-app.railway.app`)

## 🎯 Step 2: Deploy Frontend to Vercel

### 2.1 Go to Vercel
- Visit [vercel.com](https://vercel.com)
- Sign up with your GitHub account

### 2.2 Import Repository
- Click "New Project"
- Import your `LiveIPL` repository

### 2.3 Configure Frontend
- **Framework Preset**: Next.js
- **Root Directory**: `livematch`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 2.4 Add Environment Variables
In Vercel dashboard, add:
```
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.railway.app/api
```

### 2.5 Deploy
- Click "Deploy"
- Wait for deployment to complete

## 🔗 Step 3: Update API URLs

### 3.1 Update Frontend API Calls
Your frontend is already configured to use environment variables. Just make sure:
- `NEXT_PUBLIC_API_URL` is set in Vercel
- Points to your Railway backend URL

### 3.2 Test Your APIs
Test these endpoints on your Railway backend:
- Health: `https://your-app.railway.app/api/health`
- Points Table: `https://your-app.railway.app/api/points-table`
- Match Schedule: `https://your-app.railway.app/api/match-schedule`
- Live Match: `https://your-app.railway.app/api/live-match`

## 🌍 Step 4: Access Your Live App

### Frontend URLs
- **Production**: `https://your-app.vercel.app`
- **Home Page**: `https://your-app.vercel.app/`
- **Points Table**: `https://your-app.vercel.app/points`
- **Match Schedule**: `https://your-app.vercel.app/matches`

### Backend API
- **Base URL**: `https://your-app.railway.app/api`
- **Health Check**: `https://your-app.railway.app/api/health`

## 🔄 Step 5: Continuous Deployment

### Automatic Updates
- Every push to `main` branch triggers automatic deployment
- Both Vercel and Railway will rebuild and deploy automatically

### Manual Updates
If you need to redeploy manually:
- **Backend**: Go to Railway dashboard → Deployments → Redeploy
- **Frontend**: Go to Vercel dashboard → Deployments → Redeploy

## 🐛 Troubleshooting

### Common Issues
1. **API Connection Failed**
   - Check if Railway backend is running
   - Verify `NEXT_PUBLIC_API_URL` in Vercel
   - Test backend endpoints directly

2. **Build Failures**
   - Check Vercel build logs
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

3. **Environment Variables**
   - Make sure all required variables are set in Vercel
   - Variables must start with `NEXT_PUBLIC_` to be accessible in browser

## 📱 Testing Your Live App

### 1. Test Home Page
- Navigate to your Vercel URL
- Check if IPL logo and navigation work
- Verify upcoming matches are displayed

### 2. Test Points Table
- Go to `/points` route
- Check if season selector works
- Verify data loads from Railway API

### 3. Test Match Schedule
- Go to `/matches` route
- Check if all matches are displayed
- Verify status badges work correctly

### 4. Test Live Match
- Check if live match data is displayed
- Verify real-time updates (if any match is live)

## 🎉 Success!

Once everything is working:
- Your IPL app is live on the internet!
- Share your Vercel URL with others
- Monitor Railway dashboard for API performance
- Check Vercel analytics for frontend performance

## 🔗 Quick Links
- **GitHub**: https://github.com/anurag-si/LiveIPL.git
- **Railway**: https://railway.app
- **Vercel**: https://vercel.com
- **Next.js Docs**: https://nextjs.org/docs
- **Express.js Docs**: https://expressjs.com

---

**Need Help?** Check the logs in both Railway and Vercel dashboards for detailed error information.

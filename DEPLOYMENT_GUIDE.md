# 🚀 Deployment Guide - Vercel + Render

Complete step-by-step guide to deploy your StayWise application!

---

## 📋 Prerequisites

Before you start, make sure you have:
- ✅ GitHub account (code is already pushed!)
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Render account (sign up at https://render.com)
- ✅ MongoDB Atlas account (for production database)

---

## Part 1: Setup MongoDB Atlas (Database) 🗄️

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub (easiest)
3. Choose **FREE tier** (M0 Sandbox)

### Step 2: Create a Cluster
1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select region closest to you (e.g., AWS / Oregon)
4. Cluster name: `StayWise` (or any name)
5. Click **"Create"**

### Step 3: Setup Database Access
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `staywise-admin` (or your choice)
5. Password: Click **"Autogenerate Secure Password"** (SAVE THIS!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Setup Network Access
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access From Anywhere"** (for Render)
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Database"** tab
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://staywise-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANT**: Replace `<password>` with the password you saved earlier!
6. Add database name: Change `/?retry` to `/staywise?retry`

Final string should look like:
```
mongodb+srv://staywise-admin:your-password-here@cluster0.xxxxx.mongodb.net/staywise?retryWrites=true&w=majority
```

**SAVE THIS CONNECTION STRING!** You'll need it for Render.

---

## Part 2: Deploy Backend to Render 🖥️

### Step 1: Login to Render
1. Go to https://render.com
2. Sign up/Login with GitHub
3. Authorize Render to access your repositories

### Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository: `vibhor121/dotSyndicate`
4. Click **"Connect"**

### Step 3: Configure Web Service

**Basic Settings:**
- **Name**: `staywise-backend` (or your choice)
- **Region**: Oregon (US West) - Free tier
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables one by one:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | *Your MongoDB Atlas connection string from above* |
| `JWT_SECRET` | *Any random string (e.g., `my-super-secret-jwt-key-2024`)* |
| `FRONTEND_URL` | `https://your-app-name.vercel.app` (update after deploying frontend) |

**Example:**
```
MONGODB_URI=mongodb+srv://staywise-admin:password123@cluster0.xxxxx.mongodb.net/staywise?retryWrites=true&w=majority
JWT_SECRET=my-super-secret-jwt-key-change-this-123
FRONTEND_URL=http://localhost:3000
```

### Step 5: Deploy!
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Once deployed, you'll see: **"Your service is live 🎉"**
4. Copy your backend URL (looks like): `https://staywise-backend.onrender.com`

**IMPORTANT**: Save this URL! You'll need it for Vercel.

### Step 6: Test Backend
Open your backend URL in browser: `https://staywise-backend.onrender.com`

You should see:
```json
{
  "message": "StayWise API is running!",
  "version": "1.0.0",
  "status": "healthy"
}
```

✅ Backend is deployed!

---

## Part 3: Deploy Frontend to Vercel 🌐

### Step 1: Login to Vercel
1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find your repository: `vibhor121/dotSyndicate`
3. Click **"Import"**

### Step 3: Configure Project

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** 
- Click **"Edit"**
- Select `client`
- Click **"Continue"**

**Build Settings:**
- Build Command: `npm run build` (leave default)
- Output Directory: `.next` (leave default)
- Install Command: `npm install` (leave default)

### Step 4: Add Environment Variables

Click **"Environment Variables"**

Add this variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | Your Render backend URL + `/api` |

**Example:**
```
NEXT_PUBLIC_API_URL=https://staywise-backend.onrender.com/api
```

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Once done: **"Congratulations! 🎉"**
4. Click **"Visit"** to see your live app!

Your app URL will be: `https://your-app-name.vercel.app`

✅ Frontend is deployed!

---

## Part 4: Update Backend FRONTEND_URL 🔄

Now that you have your Vercel URL, update the backend:

1. Go back to **Render Dashboard**
2. Click on your **staywise-backend** service
3. Click **"Environment"** (left sidebar)
4. Find `FRONTEND_URL` variable
5. Click **"Edit"**
6. Change value to your Vercel URL:
   ```
   https://your-app-name.vercel.app
   ```
7. Click **"Save Changes"**
8. Backend will automatically redeploy

✅ CORS is now properly configured!

---

## Part 5: Seed Database (Optional but Recommended) 🌱

To add sample data and admin user:

### Option 1: Using Render Shell
1. Go to Render Dashboard → Your backend service
2. Click **"Shell"** tab
3. Run:
   ```bash
   npm run seed
   ```

### Option 2: Manually via MongoDB Atlas
1. Go to MongoDB Atlas
2. Click **"Browse Collections"**
3. Create collections: `users`, `properties`, `bookings`
4. Insert documents manually

**Or just create admin user via API:**
Make a POST request to: `https://your-backend.onrender.com/api/auth/signup`

Body:
```json
{
  "name": "Admin User",
  "email": "admin@staywise.com",
  "password": "admin123"
}
```

Then manually update the user's role to "admin" in MongoDB Atlas.

---

## 🎉 You're Live! Test Your App

### Test URLs:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend API**: `https://your-backend.onrender.com`
- **Backend Health**: `https://your-backend.onrender.com/`

### Test Accounts:
After seeding, you can login with:

**Admin Account:**
- Email: `admin@staywise.com`
- Password: `admin123`

**Regular User:**
- Email: `user@test.com`
- Password: `user123`

---

## 🐛 Troubleshooting

### Frontend Issues

**"Network Error" or "Failed to fetch"**
- Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Make sure it includes `/api` at the end
- Make sure backend URL is correct

**Solution:**
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL`
4. Redeploy (Deployments → Latest → Redeploy)

### Backend Issues

**"Cannot connect to MongoDB"**
- Check `MONGODB_URI` in Render environment variables
- Make sure password doesn't have special characters
- Make sure IP whitelist is set to "Allow from anywhere"

**"CORS Error"**
- Check `FRONTEND_URL` in Render environment variables
- Make sure it matches your Vercel URL exactly (no trailing slash)

### Database Issues

**"No collections found"**
- Run seed script: `npm run seed` in Render shell
- Or create data manually via API

---

## 🔐 Security Checklist

Before going live:

- ✅ Change `JWT_SECRET` to a strong random string
- ✅ MongoDB IP whitelist configured
- ✅ Environment variables set correctly
- ✅ `.env` files NOT committed to GitHub
- ✅ Test all features (login, signup, booking, admin)

---

## 🚀 Quick Commands

### Redeploy Frontend (Vercel)
```bash
# Push to GitHub
git add .
git commit -m "update"
git push origin main

# Vercel auto-deploys on push!
```

### Redeploy Backend (Render)
```bash
# Push to GitHub
git add .
git commit -m "update"
git push origin main

# Render auto-deploys on push!
```

### View Logs

**Vercel Logs:**
Dashboard → Your Project → Deployments → View Function Logs

**Render Logs:**
Dashboard → Your Service → Logs tab

---

## 📱 Your Live URLs

After deployment, update these:

```
Frontend (Vercel): https://________.vercel.app
Backend (Render):  https://________.onrender.com
Database (Atlas):  mongodb+srv://________.mongodb.net
```

---

## 🎓 What You've Deployed

### Architecture:
```
┌─────────────────────────────────────────────┐
│  Frontend (Vercel)                          │
│  Next.js + React Query + Tailwind          │
│  https://your-app.vercel.app               │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  Backend (Render)                           │
│  Node.js + Express + TypeScript            │
│  https://your-backend.onrender.com         │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  Database (MongoDB Atlas)                   │
│  Cloud MongoDB                              │
│  mongodb+srv://cluster.mongodb.net         │
└─────────────────────────────────────────────┘
```

### Features Live:
- ✅ Property browsing with filters
- ✅ User authentication (signup/login)
- ✅ Property booking system
- ✅ User bookings page
- ✅ Admin dashboard (view all bookings)
- ✅ React Query (caching & auto-refetch)
- ✅ Role-based access control
- ✅ Responsive design

---

## 🎉 Congratulations!

Your full-stack application is now live on the internet! 🌐

Share your live URL with friends and family!

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

**Created:** $(date)
**Status:** 🚀 Ready to Deploy!


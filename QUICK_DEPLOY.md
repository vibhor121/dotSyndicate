# ⚡ Quick Deploy Checklist

Super fast deployment guide!

## 🎯 Prerequisites (5 minutes)
- [ ] GitHub account (✅ Already have - code is pushed!)
- [ ] Vercel account → https://vercel.com
- [ ] Render account → https://render.com
- [ ] MongoDB Atlas account → https://mongodb.com/cloud/atlas

---

## 📝 Step-by-Step (15 minutes total)

### 1️⃣ MongoDB Atlas (5 min)
```
1. Sign up at mongodb.com/atlas
2. Create FREE cluster (M0)
3. Create database user + password
4. Allow access from anywhere (0.0.0.0/0)
5. Get connection string
6. Replace <password> and add /staywise
```

**Save this:**
```
mongodb+srv://username:password@cluster.mongodb.net/staywise?retryWrites=true&w=majority
```

---

### 2️⃣ Deploy Backend - Render (5 min)

**URL:** https://render.com

```
1. Click "New +" → "Web Service"
2. Connect GitHub repo: vibhor121/dotSyndicate
3. Configure:
   - Name: staywise-backend
   - Root Directory: server
   - Build Command: npm install && npm run build
   - Start Command: npm start
```

**Environment Variables:**
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=my-super-secret-key-change-this
FRONTEND_URL=http://localhost:3000
```

4. Click "Create Web Service"
5. Wait 3-5 minutes
6. Copy your backend URL: `https://your-app.onrender.com`

---

### 3️⃣ Deploy Frontend - Vercel (3 min)

**URL:** https://vercel.com

```
1. Click "Add New" → "Project"
2. Import: vibhor121/dotSyndicate
3. Configure:
   - Root Directory: client
   - Framework: Next.js (auto-detected)
```

**Environment Variable:**
```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

4. Click "Deploy"
5. Wait 2-3 minutes
6. Copy your app URL: `https://your-app.vercel.app`

---

### 4️⃣ Update Backend FRONTEND_URL (2 min)

```
1. Go back to Render
2. Your service → Environment
3. Edit FRONTEND_URL
4. Set to: https://your-app.vercel.app
5. Save (auto redeploys)
```

---

## ✅ You're Live!

**Test your app:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`

**Test login:**
- Email: `admin@staywise.com`
- Password: `admin123`

(Create admin user first via signup, then manually update role to "admin" in MongoDB)

---

## 🐛 Common Issues

**"Cannot connect to database"**
→ Check MongoDB connection string in Render env vars

**"CORS error"**
→ Update FRONTEND_URL in Render to match Vercel URL

**"Properties not loading"**
→ Check NEXT_PUBLIC_API_URL in Vercel settings
→ Make sure it ends with `/api`

---

## 🎉 Done!

Your app is now live! Share the link! 🚀

For detailed guide, see: `DEPLOYMENT_GUIDE.md`


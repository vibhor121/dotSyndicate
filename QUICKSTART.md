# 🚀 Quick Start Guide

Follow these simple steps to get StayWise up and running on your local machine.

## Prerequisites Check
- ✅ Node.js installed (v18+): Run `node --version`
- ✅ npm installed: Run `npm --version`

## Step-by-Step Setup

### 1️⃣ Setup Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (IMPORTANT!)
cat > .env << 'EOF'
MONGODB_URI=mongodb+srv://edugamify_admin:Manisha_Pal123@cluster0.tljls16.mongodb.net/staywise?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
PORT=5000
NODE_ENV=development
EOF

# Seed the database with sample data
npx ts-node src/seed.ts

# Start the server
npm run dev
```

✅ Server should be running on http://localhost:5000

Keep this terminal open and open a new terminal for the client.

---

### 2️⃣ Setup Frontend Client

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF

# Start the client
npm run dev
```

✅ Client should be running on http://localhost:3000

---

## 🎉 You're Ready!

Open your browser and go to: **http://localhost:3000**

### Test Accounts

Use these credentials to login:

**Regular User:**
- Email: `user@test.com`
- Password: `user123`

**Admin User:**
- Email: `admin@staywise.com`
- Password: `admin123`

---

## 🔍 What to Try

1. **Browse Properties** - View all available properties on the home page
2. **Filter Properties** - Use location and type filters
3. **View Details** - Click on any property to see full details
4. **Make a Booking** - Login and book a property with dates
5. **View Bookings** - Check your bookings page
6. **Admin Features** - Login as admin to see all bookings

---

## 🆘 Troubleshooting

### Server won't start?
- Check if MongoDB connection string is correct in `.env`
- Make sure port 5000 is not already in use

### Client won't start?
- Check if `.env.local` file exists in client directory
- Make sure port 3000 is not already in use
- Verify server is running on port 5000

### Database connection error?
- Verify internet connection (for MongoDB Atlas)
- Check MongoDB Atlas credentials in `.env` file

### Need to reset data?
Run the seed script again:
```bash
cd server
npx ts-node src/seed.ts
```

---

## 📱 Features to Explore

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Property Browsing with Filters
- ✅ Detailed Property View
- ✅ Booking System
- ✅ User Booking History
- ✅ Admin Dashboard (view all bookings)
- ✅ Responsive Design
- ✅ Beautiful UI

---

## 🛑 Stop the Servers

Press `Ctrl + C` in both terminal windows to stop the servers.

---

Enjoy exploring StayWise! 🏖️🏨


# StayWise - Property Booking Platform

A full-stack web application for listing properties and creating bookings, similar to villa/hotel booking platforms like Airbnb.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Axios** for API communication
- **React Hot Toast** for notifications

### Backend
- **Node.js** with **Express.js**
- **TypeScript**
- **MongoDB** with Mongoose
- **JWT** authentication
- **bcryptjs** for password hashing

## ✨ Features

### Authentication & Authorization
- ✅ Email/password signup and login
- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ Role-based access control (User/Admin)

### Properties
- ✅ Browse all properties
- ✅ Filter by location and property type
- ✅ View detailed property information
- ✅ Image galleries
- ✅ Admin can create new properties

### Bookings
- ✅ Create bookings with date selection
- ✅ Automatic price calculation
- ✅ Users can view their own bookings
- ✅ Admin can view all bookings
- ✅ Booking validation (dates, guest count, etc.)

### UX Pages
- ✅ Login / Signup pages
- ✅ Property List (Home page)
- ✅ Property Details page
- ✅ My Bookings page

## 📁 Project Structure

```
dotSyndicate/
├── server/              # Backend Express.js API
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Auth middleware
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   ├── index.ts     # Server entry point
│   │   └── seed.ts      # Database seeder
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── client/              # Frontend Next.js app
    ├── src/
    │   ├── app/         # Next.js pages
    │   ├── components/  # React components
    │   ├── context/     # React context
    │   └── lib/         # Utilities
    ├── package.json
    ├── tailwind.config.ts
    └── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (connection string provided)

### 1. Clone the Repository
```bash
cd /home/vibhor/Downloads/vibhorpersonal/masaiCompanies/dotSyndicate
```

### 2. Setup Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb+srv://edugamify_admin:Manisha_Pal123@cluster0.tljls16.mongodb.net/staywise?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
PORT=5000
NODE_ENV=development
```

Seed the database with sample data:
```bash
npx ts-node src/seed.ts
```

Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### 3. Setup Frontend (Client)

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```

The application will be running at `http://localhost:3000`

## 👥 Test Accounts

After seeding the database, you can login with:

- **Admin Account:**
  - Email: `admin@staywise.com`
  - Password: `admin123`

- **User Account:**
  - Email: `user@test.com`
  - Password: `user123`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (requires auth)

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property (admin only)

### Bookings
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings/my-bookings` - Get user's bookings (requires auth)
- `GET /api/bookings/all` - Get all bookings (admin only)

## 🎨 Design Features

- Modern, clean UI with professional color scheme
- Fully responsive design
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback
- Image galleries with thumbnail navigation
- Real-time price calculations
- Date validation for bookings

## 🔒 Security Features

- Password hashing using bcryptjs
- JWT token authentication
- Protected API routes with middleware
- Role-based access control
- Input validation using express-validator
- Secure MongoDB connection

## 📦 Sample Data

The seed script creates:
- 2 users (1 admin, 1 regular user)
- 6 sample properties (various types: villa, hotel, apartment, cottage)
- Properties in different Indian locations (Goa, Manali, Mumbai, Jaipur, Udaipur, Bangalore)

## 🚀 Production Deployment

### Backend
1. Build the TypeScript code:
   ```bash
   cd server
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Frontend
1. Build the Next.js application:
   ```bash
   cd client
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## 📝 Additional Notes

- The database name is `staywise` in the MongoDB Atlas cluster
- Images are sourced from Unsplash for demonstration
- JWT tokens expire after 7 days
- All passwords must be at least 6 characters
- Property prices are in Indian Rupees (₹)

## 🤝 Contributing

This is an assignment project. Feel free to explore and enhance the features!

## 📄 License

This project is created as an assignment for educational purposes.


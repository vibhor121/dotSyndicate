# StayWise Server

Backend server for the StayWise property booking platform.

## Tech Stack

- **Node.js** with **Express.js**
- **TypeScript**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

## Features

- User authentication (signup/login) with JWT
- Role-based access control (user/admin)
- Property management
- Booking system
- RESTful API design

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the server root directory with the following:
   ```
   MONGODB_URI=mongodb+srv://edugamify_admin:Manisha_Pal123@cluster0.tljls16.mongodb.net/staywise?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
   PORT=5000
   NODE_ENV=development
   ```

3. **Seed the database** (optional - adds sample data):
   ```bash
   npx ts-node src/seed.ts
   ```
   This creates:
   - Admin user: `admin@staywise.com` / `admin123`
   - Test user: `user@test.com` / `user123`
   - 6 sample properties

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (requires auth)

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property (admin only)

### Bookings
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings/my-bookings` - Get user's bookings (requires auth)
- `GET /api/bookings/all` - Get all bookings (admin only)

## Default Users

After seeding:
- **Admin:** admin@staywise.com / admin123
- **User:** user@test.com / user123

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── index.ts         # App entry point
│   └── seed.ts          # Database seeder
├── package.json
├── tsconfig.json
└── README.md
```

## Testing the API

You can use tools like Postman or Thunder Client to test the endpoints:

1. Sign up or login to get a JWT token
2. Include the token in the Authorization header for protected routes:
   ```
   Authorization: Bearer <your_token>
   ```


# StayWise Client

Frontend application for the StayWise property booking platform built with Next.js.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Axios** for API calls
- **React Hot Toast** for notifications
- **date-fns** for date formatting

## Features

- User authentication (Login/Signup)
- Property browsing with filters
- Detailed property view with image gallery
- Booking system with date selection
- User booking management
- Responsive design
- Beautiful modern UI

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env.local` file in the client root directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Pages

- `/` - Home page with property listings and filters
- `/login` - User login
- `/signup` - User registration
- `/property/[id]` - Property details and booking
- `/bookings` - User's booking history

## Features Overview

### Authentication
- Email/password based authentication
- JWT token management
- Protected routes for authenticated users
- Auto-redirect on unauthorized access

### Property Browsing
- View all available properties
- Filter by location and property type
- Property cards with images and key details
- Responsive grid layout

### Property Details
- Image gallery with thumbnail navigation
- Complete property information
- Real-time price calculation
- Booking form with date validation

### Booking Management
- View all user bookings
- Booking status tracking
- Detailed booking information
- Empty state with call-to-action

## Test Credentials

After seeding the database, you can use:
- **User:** user@test.com / user123
- **Admin:** admin@staywise.com / admin123

## Project Structure

```
client/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── login/           # Login page
│   │   ├── signup/          # Signup page
│   │   ├── property/[id]/   # Property details page
│   │   ├── bookings/        # User bookings page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page (property list)
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── PropertyCard.tsx
│   │   └── BookingCard.tsx
│   ├── context/             # React context
│   │   └── AuthContext.tsx
│   ├── lib/                 # Utilities
│   │   ├── api.ts          # API client configuration
│   │   └── auth.ts         # Authentication utilities
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json

```

## Key Technologies

- **Next.js App Router:** Modern routing with layouts and server components
- **TypeScript:** Type safety throughout the application
- **Tailwind CSS:** Utility-first CSS framework for styling
- **Axios Interceptors:** Automatic token injection and error handling
- **Local Storage:** Client-side token and user data persistence

## Design Features

- Clean and modern UI with a professional color scheme
- Responsive design that works on all devices
- Smooth transitions and hover effects
- Loading states and error handling
- Toast notifications for user feedback
- Empty states with helpful guidance


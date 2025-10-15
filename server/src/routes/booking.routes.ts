import express from 'express';
import { body } from 'express-validator';
import { 
  createBooking, 
  getUserBookings, 
  getAllBookings 
} from '../controllers/booking.controller';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

// Create booking (authenticated users)
router.post(
  '/',
  auth,
  [
    body('propertyId').notEmpty(),
    body('checkIn').isISO8601().toDate(),
    body('checkOut').isISO8601().toDate(),
    body('guests').isInt({ min: 1 })
  ],
  createBooking
);

// Get user's own bookings
router.get('/my-bookings', auth, getUserBookings);

// Get all bookings (admin only)
router.get('/all', adminAuth, getAllBookings);

export default router;


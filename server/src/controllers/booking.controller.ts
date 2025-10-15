import { Response } from 'express';
import { validationResult } from 'express-validator';
import Booking from '../models/Booking';
import Property from '../models/Property';
import { AuthRequest } from '../middleware/auth';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { propertyId, checkIn, checkOut, guests } = req.body;

    // Verify property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (!property.available) {
      return res.status(400).json({ message: 'Property is not available' });
    }

    if (guests > property.maxGuests) {
      return res.status(400).json({ 
        message: `Property can accommodate maximum ${property.maxGuests} guests` 
      });
    }

    // Calculate total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * property.price;

    // Create booking
    const booking = new Booking({
      user: req.user?.id,
      property: propertyId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      status: 'confirmed'
    });

    await booking.save();

    // Populate property and user details
    await booking.populate('property', 'title location images price');
    await booking.populate('user', 'name email');

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error: any) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user?.id })
      .populate('property', 'title location images price propertyType')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Bookings fetched successfully',
      count: bookings.length,
      bookings
    });
  } catch (error: any) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate('property', 'title location images price propertyType')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      message: 'All bookings fetched successfully',
      count: bookings.length,
      bookings
    });
  } catch (error: any) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


import express from 'express';
import { body } from 'express-validator';
import { 
  getAllProperties, 
  getPropertyById, 
  createProperty 
} from '../controllers/property.controller';
import { adminAuth } from '../middleware/auth';

const router = express.Router();

// Get all properties
router.get('/', getAllProperties);

// Get property by ID
router.get('/:id', getPropertyById);

// Create property (admin only)
router.post(
  '/',
  adminAuth,
  [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('location').trim().notEmpty(),
    body('price').isNumeric().isFloat({ min: 0 }),
    body('bedrooms').isInt({ min: 1 }),
    body('bathrooms').isInt({ min: 1 }),
    body('maxGuests').isInt({ min: 1 }),
    body('propertyType').isIn(['villa', 'hotel', 'apartment', 'cottage'])
  ],
  createProperty
);

export default router;


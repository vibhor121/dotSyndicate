import express from 'express';
import { body } from 'express-validator';
import { signup, login, getProfile } from '../controllers/auth.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

// Signup
router.post(
  '/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().notEmpty()
  ],
  signup
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  login
);

// Get current user profile
router.get('/profile', auth, getProfile);

export default router;


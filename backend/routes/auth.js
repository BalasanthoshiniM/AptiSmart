const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const user  = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id:           user._id,
        name:         user.name,
        email:        user.email,
        currentLevel: user.currentLevel,
        totalAttempts:user.totalAttempts,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = signToken(user._id);

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id:            user._id,
        name:          user.name,
        email:         user.email,
        currentLevel:  user.currentLevel,
        totalAttempts: user.totalAttempts,
        totalScore:    user.totalScore,
        totalQuestions:user.totalQuestions,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    user: {
      id:            user._id,
      name:          user.name,
      email:         user.email,
      currentLevel:  user.currentLevel,
      totalAttempts: user.totalAttempts,
      totalScore:    user.totalScore,
      totalQuestions:user.totalQuestions,
      accuracy:      user.totalQuestions > 0 ? Math.round(user.totalScore / user.totalQuestions * 100) : 0,
    },
  });
});

module.exports = router;
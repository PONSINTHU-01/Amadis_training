const express = require('express');
const router = express.Router();
const { User, ExpenseClaim } = require('../models');
const auth = require('../middlewares/authMiddleware');  // add your auth middleware
const adminMiddleware = require('../middlewares/authMiddleware'); // optional, for admin only access
const { approveOrReject, getAllClaims } = require('../controllers/approvalController');

// Get all users (admin only)
router.get('/users', auth, adminMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all expense claims (admin only)
router.get('/all-claims', auth, adminMiddleware, getAllClaims);

// Approve or reject a claim (admin only)
router.patch('/claim/:claimId/status', auth, adminMiddleware, approveOrReject);

module.exports = router;

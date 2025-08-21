// // const router = require('express').Router();
// // const { approveOrReject, getAllClaims } = require('../controllers/approvalController');
// // const auth = require('../middlewares/authMiddleware');

// // router.post('/:claimId', auth, approveOrReject);
// // router.get('/', auth, getAllClaims);

// // module.exports = router;


// const express = require('express');
// const router = express.Router();

// const auth = require('../middlewares/authMiddleware');

// // Define adminMiddleware here
// const adminMiddleware = (req, res, next) => {
//   if (req.user && req.user.role === 'Admin') {
//     next();
//   } else {
//     res.status(403).json({ error: 'Forbidden: Admins only' });
//   }
// };

// // Import your controllers
// const { approveOrReject, getAllClaims } = require('../controllers/approvalController');

// // Routes using auth and adminMiddleware
// router.get('/users', auth, adminMiddleware, async (req, res) => {
//   try {
//     const users = await require('../models').User.findAll();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/all-claims', auth, adminMiddleware, getAllClaims);

// router.patch('/claim/:claimId/status', auth, adminMiddleware, approveOrReject);

// module.exports = router;



const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

// Admin middleware to check if user role is Admin
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Admins only' });
  }
};

// Import controller functions properly
const { approveOrReject, getAllClaims } = require('../controllers/approvalController');
const { User } = require('../models');

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

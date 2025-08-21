const router = require('express').Router();
const { createExpense, getMyClaims } = require('../controllers/expenseController');
const auth = require('../middlewares/authMiddleware');
const multer = require('multer');

// Configure multer to store uploaded files in 'uploads' folder with original filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique file name
  }
});
const upload = multer({ storage: storage });

router.post('/create', auth, upload.single('receipt'), createExpense);
router.get('/mine', auth, getMyClaims);

module.exports = router;

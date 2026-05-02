const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('user'), createBooking);
router.get('/my', protect, getMyBookings);
router.get('/', protect, authorize('vendor', 'admin'), getBookings);
router.put('/:id/status', protect, authorize('vendor', 'admin'), updateBookingStatus);

module.exports = router;

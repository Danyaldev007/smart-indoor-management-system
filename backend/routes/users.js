const express = require('express');
const router = express.Router();
const { getAllUsers, approveVendor } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), getAllUsers);
router.put('/vendor/:id/approve', protect, authorize('admin'), approveVendor);

module.exports = router;

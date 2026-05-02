const express = require('express');
const router = express.Router();
const {
  createFacility,
  getFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
} = require('../controllers/facilityController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getFacilities);
router.get('/:id', getFacilityById);
router.post('/', protect, authorize('vendor', 'admin'), createFacility);
router.put('/:id', protect, authorize('vendor', 'admin'), updateFacility);
router.delete('/:id', protect, authorize('vendor', 'admin'), deleteFacility);

module.exports = router;

const Booking = require('../models/Booking');
const Facility = require('../models/Facility');

const createBooking = async (req, res, next) => {
  try {
    const { facilityId, date, startTime, endTime, totalPrice } = req.body;

    if (!facilityId || !date || !startTime || !endTime || !totalPrice) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    const existingBooking = await Booking.findOne({
      facility: facilityId,
      date,
      startTime,
      endTime,
      status: { $ne: 'cancelled' },
    });

    if (existingBooking) {
      return res.status(409).json({ message: 'Slot already booked' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      facility: facilityId,
      date,
      startTime,
      endTime,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('facility', 'title sportType location pricePerHour');
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    if (req.user.role === 'vendor') {
      const facilities = await Facility.find({ owner: req.user._id }).select('_id');
      const facilityIds = facilities.map((facility) => facility._id);
      const bookings = await Booking.find({ facility: { $in: facilityIds } }).populate('user', 'name email').populate('facility', 'title');
      return res.json(bookings);
    }

    if (req.user.role === 'admin') {
      const bookings = await Booking.find().populate('user', 'name email').populate('facility', 'title');
      return res.json(bookings);
    }

    return res.status(403).json({ message: 'Not authorized to view these bookings' });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id).populate('facility');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role === 'vendor') {
      if (booking.facility.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this booking' });
      }
    }

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookings,
  updateBookingStatus,
};

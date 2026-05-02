const Facility = require('../models/Facility');

const createFacility = async (req, res, next) => {
  try {
    const { title, description, sportType, location, pricePerHour, images, slots } = req.body;

    if (!title || !sportType || !pricePerHour) {
      return res.status(400).json({ message: 'Title, sport type, and price are required' });
    }

    const facility = await Facility.create({
      owner: req.user._id,
      title,
      description,
      sportType,
      location,
      pricePerHour,
      images: images || [],
      slots: slots || [],
    });

    res.status(201).json(facility);
  } catch (error) {
    next(error);
  }
};

const getFacilities = async (req, res, next) => {
  try {
    const { sportType, active } = req.query;
    const filter = {};

    if (sportType) filter.sportType = sportType;
    if (active !== undefined) filter.active = active === 'true';

    const facilities = await Facility.find(filter).populate('owner', 'name email role');
    res.json(facilities);
  } catch (error) {
    next(error);
  }
};

const getFacilityById = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id).populate('owner', 'name email role');
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.json(facility);
  } catch (error) {
    next(error);
  }
};

const updateFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    if (facility.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this facility' });
    }

    const updates = req.body;
    Object.assign(facility, updates);
    await facility.save();
    res.json(facility);
  } catch (error) {
    next(error);
  }
};

const deleteFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    if (facility.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this facility' });
    }

    await facility.remove();
    res.json({ message: 'Facility deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFacility,
  getFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
};

const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const approveVendor = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'vendor') {
      return res.status(400).json({ message: 'User is not a vendor' });
    }

    user.vendorApproved = true;
    await user.save();
    res.json({ message: 'Vendor approved', user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, approveVendor };

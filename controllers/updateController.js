// controllers/updateCarController.js
const User = require("../models/User");

const updateCarController = async (req, res) => {
  const { make, model, year, platno } = req.body;
  const user = await User.findById(req.user._id);

  user.car_details = { make, model, year, platno };
  await user.save();
  res.redirect(`/g?userId=${user._id}`); // Include userId in redirect
};

module.exports = updateCarController;
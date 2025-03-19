const User = require("../models/User");

module.exports = async (req, res) => {
  res.render("g2_page", { user: req.user, error: null });
};
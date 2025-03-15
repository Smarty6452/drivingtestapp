// controllers/loginController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("loginPage", { error: "Invalid username or password", user: null });
  }

  if (user.userType === "Driver") {
    res.redirect(`/g2?userId=${user._id}`);
  } else {
    res.redirect(`/dashboard?userId=${user._id}`);
  }
};

module.exports = loginController;
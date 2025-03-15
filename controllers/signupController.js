// controllers/signupController.js
const User = require("../models/User");

const signupController = async (req, res) => {
  const { username, password, repeatedPassword, userType } = req.body;

  if (!username || !password || !repeatedPassword || !userType) {
    return res.render("loginPage", { error: "All fields are required", user: null });
  }
  if (password !== repeatedPassword) {
    return res.render("loginPage", { error: "Passwords do not match", user: null });
  }
  if (username.length < 3) {
    return res.render("loginPage", { error: "Username must be at least 3 characters", user: null });
  }
  if (await User.findOne({ username })) {
    return res.render("loginPage", { error: "Username already exists", user: null });
  }

  const newUser = new User({ username, password, userType });
  await newUser.save();
  res.redirect("/login");
};

module.exports = signupController;
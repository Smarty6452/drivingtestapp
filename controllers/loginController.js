const User = require("../models/User");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    // Redirect to login with an error query parameter
    return res.redirect("/login?error=Invalid username or password");
  }

  if (user.userType === "Driver") {
    return res.redirect(`/g2?userId=${user._id}&success=Logged in successfully`);
  } else {
    return res.redirect(`/dashboard?userId=${user._id}&success=Logged in successfully`);
  }
};

module.exports = loginController;
const User = require("../models/User");

const signup = async (req, res) => {
  const { username, password, repeatedPassword, userType } = req.body;

  if (!username || !password || !repeatedPassword || !userType) {
    return res.render("loginPage", { error: "All fields are required", user: null, success: null });
  }

  if (password !== repeatedPassword) {
    return res.render("loginPage", { error: "Passwords do not match", user: null, success: null });
  }

  if (username.length < 3) {
    return res.render("loginPage", { error: "Username must be at least 3 characters", user: null, success: null });
  }

  try {
    if (await User.findOne({ username })) {
      return res.render("loginPage", { error: "Username already exists", user: null, success: null });
    }

    const newUser = new User({ username, password, userType });
    await newUser.save();

    res.redirect("/login?success=Signed up successfully");
  } catch (error) {
    console.error("Signup Error:", error);
    res.render("loginPage", { error: "Internal Server Error: Unable to sign up", user: null, success: null });
  }
};

module.exports = signup; // Export the function directly
// middlewares/authMiddleware.js
const mongoose = require("mongoose");

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  const userId = req.query.userId || req.body.userId;
  if (!userId) return res.redirect("/login");

  const user = await mongoose.model("User").findById(userId);
  if (!user) return res.render("loginPage", { error: "User not found, please log in again", user: null });
  req.user = user;
  next();
};

// Middleware to restrict to Drivers only
const isAuthenticatedDriver = async (req, res, next) => {
  await isAuthenticated(req, res, async () => {
    if (req.user.userType !== "Driver") {
      return res.render("error", { message: "Access Denied: Only Drivers can access G2 and G Test pages.", user: req.user });
    }
    next();
  });
};

module.exports = { isAuthenticated, isAuthenticatedDriver };

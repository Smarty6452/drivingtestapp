// app.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 4000;

// Import controllers
const loginController = require("./controllers/loginController");
const signupController = require("./controllers/signupController");
const gController = require("./controllers/gController");
const updateCarController = require("./controllers/updateController");
const registerController = require("./controllers/registerController");

// MongoDB connection
mongoose
  .connect("mongodb+srv://rbharti3077:9013077@cluster0.ze44b.mongodb.net/drivingTestDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Routes
app.get("/", (req, res) => res.redirect("/login"));
app.get("/login", (req, res) => res.render("loginPage", { error: null, user: null }));
app.post("/login", loginController);
app.post("/signup", signupController);

// Protected routes
app.get("/dashboard", isAuthenticated, (req, res) => res.render("dashboard", { user: req.user }));
app.get("/g2", isAuthenticatedDriver, gController);
app.post("/g2", isAuthenticatedDriver, gController);
app.get("/g", isAuthenticatedDriver, (req, res) => res.render("g_page", { user: req.user }));
app.post("/g", isAuthenticatedDriver, (req, res) => res.render("g_page", { user: req.user }));
app.post("/g2/save", isAuthenticatedDriver, registerController);
app.post("/g/update", isAuthenticatedDriver, updateCarController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
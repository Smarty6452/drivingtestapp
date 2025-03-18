const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Import controllers
const loginController = require("./controllers/loginController");
const signupController = require("./controllers/signupController");
const gController = require("./controllers/gController");
const updateCarController = require("./controllers/updateController");
const registerController = require("./controllers/registerController");

// Import middleware
const { isAuthenticated, isAuthenticatedDriver } = require("./middlewares/authMiddleware");

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

// Request handler starts here
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

app.all("*", (req, res) => {
  res.status(404).render("404", { user: req.user || null });
});

// app.use((req, res, next) => {
//   res.status(404).render("404", { user: req.user || null });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstname: { type: String, default: "default" },
  lastname: { type: String, default: "default" },
  licenseNumber: { type: String, default: "default" },
  Age: { type: Number, default: 0 },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["Driver", "Examiner", "Admin"], required: true },
  car_details: {
    make: { type: String, default: "default" },
    model: { type: String, default: "default" },
    year: { type: Number, default: 0 },
    platno: { type: String, default: "default" },
  },
});

// Encrypt password and license number before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
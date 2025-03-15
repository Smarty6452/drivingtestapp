const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    const users = await User.find({});
    res.render("index", { users });
  } catch (error) {
    console.error("Error Fetching Users:", error);
    res.status(500).send("Internal Server Error");
  }
};

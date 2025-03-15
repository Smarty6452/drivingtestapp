const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    const { licenseNumber } = req.body;
    const user = await User.findOne({ licenseNumber });

    if (!user) {
      return res.render("g_page", {
        user: null,
        customMessage: "No User Found. Please go back to G2 Page.",
      });
    }

    res.render("g_page", { user, customMessage: null });
  } catch (error) {
    console.error("Error Fetching User:", error);
    res.status(500).send("Internal Server Error");
  }
};

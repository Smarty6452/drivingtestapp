const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.licenseNumber ||
      !req.body.age ||
      !req.body.carMake ||
      !req.body.carModel ||
      !req.body.carYear ||
      !req.body.carPlate
    ) {
      return res.render("g2_page", {
        user: req.user,
        error: "Please fill all required fields",
        success: null,
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.render("error", { message: "User not found", success: null });
    }

    user.firstname = req.body.firstName;
    user.lastname = req.body.lastName;
    user.licenseNumber = req.body.licenseNumber;
    user.Age = parseInt(req.body.age);
    user.car_details = {
      make: req.body.carMake,
      model: req.body.carModel,
      year: parseInt(req.body.carYear),
      platno: req.body.carPlate,
    };

    await user.save();
    console.log("User G2 Data Updated:", {
      firstname: user.firstname,
      lastname: user.lastname,
      licenseNumber: user.licenseNumber,
      Age: user.Age,
      car_details: user.car_details,
    });

    res.redirect(`/g?userId=${user._id}&success=G2 data saved successfully`);
  } catch (error) {
    console.error("Error Updating G2 Data:", error);
    res.render("g2_page", {
      user: req.user,
      error: "Internal Server Error: Unable to save data",
      success: null,
    });
  }
};
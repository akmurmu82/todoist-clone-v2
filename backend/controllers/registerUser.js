const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ status: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};

module.exports = registerUser;

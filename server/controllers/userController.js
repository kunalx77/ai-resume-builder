import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ----------------------------------------
   JWT Generator
---------------------------------------- */
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ----------------------------------------
   Register User
   POST /api/users/register
---------------------------------------- */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Failed to register user" });
  }
};

/* ----------------------------------------
   Login User
   POST /api/users/login
---------------------------------------- */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.password = undefined; // hide password

    return res.status(200).json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


/* ----------------------------------------
   Get Logged-in User
   GET /api/users/data
---------------------------------------- */
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    delete user.password;
    delete user.__v;

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get User Error:", error);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};

/* ----------------------------------------
   Get User Resumes
   GET /api/users/resumes
---------------------------------------- */
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    const resumes = await Resume.find({ userId })
      .sort({ updatedAt: -1 })
      .lean();

    return res.status(200).json({ resumes });
  } catch (error) {
    console.error("Get Resumes Error:", error);
    return res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

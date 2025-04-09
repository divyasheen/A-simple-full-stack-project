import bcrypt from 'bcrypt';
import User from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, biography } = req.body;

    // Backend validation: check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with data from frontend, including optional biography
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      profilepic: `http://localhost:5000/uploads/${req.myFileName}`,
      biography: biography || '', // Handle empty biography (optional)
    });

    await newUser.save();
    res.json({ msg: 'Register success', newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password"); // exclude password field
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message || "Fetching users failed" });
  }
};

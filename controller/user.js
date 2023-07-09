import User from "../model/user.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const registration = async (req, res) => {
  try {
    // Extract username, email, and password from the request body
    const { username, email, password, role } = req.body;
    console.log(req.body);

    // Create a new user instance
    const newUser = new User({ username, email, password, role });

    // Save the user to the database
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Delete the user by their userId
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({username})
    if (user) {
      const accessToken=jwt.sign({...user._doc},process.env.ACCESS_TOKEN_SECRET)
      
      res.json({...user._doc,accessToken:accessToken});
    } else {
      res.json("Error");
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = req.body;
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true, // To return the updated user after the update operation
      runValidators: true, // To run the validation defined in the User model
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

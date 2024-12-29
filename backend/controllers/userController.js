// Handles user registration, login, and fetching profile.

import User from "../models/userModel.js";
import Book from "../models/bookModel.js";
import Transaction from "../models/transactionModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/helper.js";
import { sendEmail } from "../utils/helper.js";
import crypto from "crypto";
import { Op } from "sequelize";

export async function registerUser(req,res){
    const {name,email,password,role} = req.body;
    try{
      // Validate role
      if (role && !["admin", "user"].includes(role)) {
        return res.status(400).json({ message: "Invalid role specified" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      });
      res.status(201).json({ message: "User registered successfully", user });
    }catch(error){
        res.status(500).json({message:"Error registering user",error});
    }
}

export async function loginUser(req,res){
    const {email,password} = req.body;
    try{
        const user = await User.findOne({where:{email}});
        if(!user) return res.status(404).json({message:"User not found"});

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) return res.status(401).json({message: "Invalid password"});

        const token = generateToken({id: user.id, role: user.role});
        res.json({message:"User logged in successfully",token});
    }
    catch(error){
        res.status(500).json({message:"Error logging in user",error});
    }
}

export async function getUser(req,res){
  const userId  = req.user.id; // Extract userId from the request object (set by authenticateToken)
  console.log("Received userId:", userId);
  try {
    // Fetch user data by userId
    const user = await User.findByPk(userId);

    // If user not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive information (like password) from the response
    const { password, ...userData } = user.toJSON();

    // Return all user data
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateUser(req,res){
  const {id} = req.user;
  const {name,email,password} = req.body;

  try{
    const user = await User.findByPk(id);
    if(!user) return res.status(404).json({message:"User not found"});

    if(name) user.name = name;
    if(email) user.email = email;
    if(password){
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.status(200).json({message:"Profile updated successfully",user});
  }catch(error){
    res.status(500).json({message:"Error updating profile",error});
  }
}

export async function makeAdmin(req,res){
  const { userId, action } = req.body; // userId to be updated and action: "promote" or "revoke"
  const { role } = req.user; // Role of the logged-in user (comes from authentication middleware)

  try{
    if(role !== "admin"){
      return res.status(403).json({message: "You are not authorized to perform this action"});
    }

    const user = await User.findByPk(userId);
    if(!user) return res.status(404).json({message:"User not found"});

    if(action === "promote"){
      if(user.role === "admin"){
        return res.status(400).json({message:"User is already an admin"});
      }
      user.role = "admin";
    }else if(action === "revoke"){
      if(user.role === "user"){
        return res.status(400).json({message:"User is already a user"});
      }
      user.role = "user";
    }else{
      return res.status(400).json({message:"Invalid action, must be 'promote' or 'revoke'"});
    }

    await user.save();
    return res
      .status(200)
      .json({
        message: "User role updated to '${user.role}' successfully",
        user,
      });
  }catch(error){
    return res
      .status(500)
      .json({ message: "Error updating user role", error: error.message });
  }
}

export async function forgotPassword(req,res){
  const {email} = req.body;

  try{
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send reset email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendEmail(
      user.email,
      "Password Reset Request",
      `Here is your password reset token. Please copy and paste the token in reset password page: ${resetToken}`
    );

    res.status(200).json({ message: "Password reset link sent to your email" });
  }catch(error){
    res.status(500).json({ message: "Error processing request", error });
  }
}

export async function resetPassword(req, res){
  const { token, newPassword } = req.body;

  try {
    console.log("Received token:", token);
    console.log("Received newPassword:", newPassword);

    // Find user by reset token and check expiry
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: Date.now() }, // Ensure token isn't expired
      },
    });

    if (!user) {
      console.log("Invalid or expired token");
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null; // Clear the reset token
    user.resetTokenExpiry = null;

    console.log("Saving new password...");
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
}

export async function dashBoardStats(req,res){
  try {
    // Query the database for dynamic counts
    const totalUsers = await User.count();
    const totalBooks = await Book.count();
    const totalTransactions = await Transaction.count();

    res.status(200).json({
      users: totalUsers,
      books: totalBooks,
      transactions: totalTransactions,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
}

export async function getAllUsers(req, res) {
  try {
    // Fetch all users
    const users = await User.findAll({
      attributes: { exclude: ["password", "resetToken", "resetTokenExpiry"] }, // Exclude sensitive information
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
}

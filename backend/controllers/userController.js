// Handles user registration, login, and fetching profile.

import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/helper.js";

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
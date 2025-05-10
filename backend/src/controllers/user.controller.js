import asyncHandler from "express-async-handler";
import { z } from "zod";
import bcrypt from 'bcrypt'
import { User } from "../models/user.model.js";

const handleUserRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  });

  const validation = schema.safeParse({ name, email, password });

  if (!validation.success) {
    return res.status(400).json({
      error: validation.error.errors.map(err => err.message)
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      error: "User already exists!",
    });
  }

  const createUser = await User.create(
    {
      name,
      email,
      password: hashedPassword
    }
  )

  if (createUser) {
    return res.status(201).json({
      message: "User Register Successfully"
    })
  } else {
    return res.status(500).json({
      error: "Failed to register user. Please try again later."
    });
  }
});


export {
  handleUserRegister
}
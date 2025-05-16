import asyncHandler from "express-async-handler";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  try {
    return jwt.sign(
      {
        _id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  } catch (error) {
    console.log("Error", error);
  }
};

const handleUserRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const validation = schema.safeParse({ name, email, password });

  if (!validation.success) {
    return res.status(400).json({
      error: validation.error.errors.map((err) => err.message),
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      error: "User already exists!",
    });
  }

  const createUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (createUser) {
    return res.status(201).json({
      message: "User Register Successfully",
    });
  } else {
    return res.status(500).json({
      error: "Failed to register user. Please try again later.",
    });
  }
});

const handleUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({
      error: "Both Email and Password Fields are required",
    });
  }

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const encryptedPassword = await bcrypt.compare(password, findUser.password);

    if (!encryptedPassword) {
      return res.status(400).json({
        error: "Incorrect Password",
      });
    }

    const token = await generateToken(findUser);

    if (token && findUser) {
      return res
        .status(200)
        .cookie("accessToken", token, { httpOnly: true, secure: true })
        .json({
          accessToken: token,
          message: "User Login Successfully!",
        });
    } else {
      return res.status(500).json({
        error: `Error while login ${"User" || findUser.name}`,
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

const handleGetUser = asyncHandler(async (req, res) => {
  const user = req.user
  return res.status(200).json(
    user
  )
});

const handleGetUsersTodo = asyncHandler(async (req, res) => {
  return res.status(200).json({
    todos: req.user?.todo
  })
})

export { handleUserRegister, handleUserLogin, handleGetUser, handleGetUsersTodo };

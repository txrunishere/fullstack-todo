import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";

export const verifyAuth = expressAsyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    const encryptedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  
    const user = await User.findById(encryptedToken._id).select("-password").populate("todo")

    req.user = user

    next()
  } catch (error) {
    return res.json({
      error: error
    })
  }
});

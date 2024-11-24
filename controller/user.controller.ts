import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = "";

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() * 24 * 60 * 60 * 1000,
    });

    // jwt token
    // await sendVerificationEmail(email, verification)

    const userWithOutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(201).json({
      success: true,
      message: "Account creted successfully",
      user: userWithOutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or Password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect  password",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    //  send user

    const userWithOutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(200).json({
      success: true,
      message: `Welcome Back ${user.fullname}`,
      user: userWithOutPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: "Interna server error" });
  }
};

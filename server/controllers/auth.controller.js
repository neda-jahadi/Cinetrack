import { prisma } from "../configs/prisma.js";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";
import { generateToken } from "../utils/generateToken.js";

// https://www.webfx.com/web-development/glossary/http-status-codes/

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {email: email}
  });

  if (userExists) {
    return res.status(400).json({error: "User already exists with this email" })
  }

  // Hash password : npm i bcryptjs
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const user = await prisma.user.create({
    data: {
      name, email, password: hashedPassword
    }
  });

   // Generate JWT Token
    const token = generateToken(user.id);

  res.status(201).json({
    status: "success", data: { user: { id: user.id, name: name, email: email}, token}
  })

};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email }
    })

    if (!user) {
      res.status(401).json({message: "Invalid email or password"});
    }

    // verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      res.status(401).json({message: "Invalid email or password"});
    }

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(201).json({
      message: "success",
      data: { 
        user: {
          id: user.id, 
          name: user.name, 
          email: email
        }, 
        token
      }
      });
}

export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  
  res.status(200).json({
    status: "success",
    message: "Logged out successfully"
  })
}
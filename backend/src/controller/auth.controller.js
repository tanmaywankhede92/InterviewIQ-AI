const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");
const cookieParser = require("cookie-parser");
/**
 * @name registerUserController
 * @route Post /auth/register
 * @description Register a new user,expects username,email and password in the request body
 * @access Public
 
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "please provide username,email and password" });
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    /* isUsernameAlreadyExist.username == username */
    return res
      .status(400)
      .json({ message: "username or email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name loginUserController
 * @route Post /auth/login
 * @description Login an existing user,expects email and password in the request body 
 * @access Public
 
 */

async function loginUserController(req, res) {
  console.log("method called", req.method);
  console.log("body", req.body);
  console.log("Body", req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "please provide email and password" });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  console.log("Cookies:", req.cookies);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name logoutUserController
 * @route GET /auth/logout
 * @description Logout a user by clearing the token cookie and adding the token to the blacklist
 * @access Public
 */

// async function logoutUserController(req, res) {
//   const token = req.cookies.token;

//   if (!token) {
//     await tokenBlacklistModel.create({ token });
//   }

//   res.clearCookie("token");

//   res.status(200).json({ message: "user logged out successfully" });
// }

async function logoutUserController(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        message: "Token not found",
      });
    }

    await tokenBlacklistModel.create({ token });

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

/**
 * @name getProfileController
 * @route GET /auth/profile
 * @description Get the profile of the logged-in user
 * @access Private
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    message: "user profile fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};

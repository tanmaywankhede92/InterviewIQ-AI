const { Router } = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 *  @aroute Post /auth/register
 *  @desc Register a new user
 *  @access Public
 */

authRouter.post("/register", authController.registerUserController);

/**
 *  @aroute Post /auth/login
 *  @desc Login an existing user
 *  @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @desc Logout a user by clearing the token cookie and adding the token to the blacklist
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/profile
 * @desc Get the profile of the logged-in user
 * @access Private
 */

authRouter.get(
  "/profile",
  authMiddleware.authUser,
  authController.getMeController,
);

module.exports = authRouter;

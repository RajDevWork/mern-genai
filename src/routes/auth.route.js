const express = require("express")
const authController = require("../controller/auth.controller")
const authRouter = express.Router()


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register",authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login a user wuth email and password
 * @access Public
 */
authRouter.post("/login",authController.loginUserController)




module.exports = authRouter
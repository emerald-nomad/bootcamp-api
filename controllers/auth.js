/// <reference path="./controllers.typedefs.js" />
const { ErrorResponse } = require("../utils");
const { asyncHandler } = require("../middleware");

//
/**
 * @description Get token from model, create cookie and send response
 * @param {IUser} user
 * @param {number} statusCode
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

/**
 * @type    {IRouteFunc}
 * @access  Public
 * @route   POST /api/v1/auth/register
 * @desc    Register User
 */
exports.register = ({ authRepo }) =>
  asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await authRepo.registerUser({ name, email, password, role });

    return sendTokenResponse(user, 200, res);
  });

/**
 * @type    {IRouteFunc}
 * @access  Public
 * @route   POST /api/v1/auth/login
 * @desc    Register User
 */
exports.login = ({ userRepo }) =>
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and password", 400)
      );
    }

    const user = await userRepo.getUser(email, "+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    return sendTokenResponse(user, 200, res);
  });

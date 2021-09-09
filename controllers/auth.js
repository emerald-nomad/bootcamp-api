/// <reference path="./controllers.typedefs.js" />
const crypto = require("crypto");
const { ErrorResponse, sendEmail } = require("../utils");
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

    const user = await userRepo.getUserByEmail(email, "+password");

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

/**
 * @type    {IRouteFunc}
 * @access  Private
 * @route   POST /api/v1/auth/me
 * @desc    Get current logged in user
 */
exports.getMe = ({ userRepo }) =>
  asyncHandler(async (req, res, next) => {
    const user = await userRepo.getUserById(req.userId);

    res.status(200).json({ success: true, data: user });
  });

/**
 * @type    {IRouteFunc}
 * @access  Public
 * @route   POST /api/v1/auth/forgotpassword
 * @desc    Forgot Password
 */
exports.forgotPassword = ({ userRepo }) =>
  asyncHandler(async (req, res, next) => {
    const user = await userRepo.getUserByEmail(req.body.email);

    if (!user) {
      return next(new ErrorResponse(`There is no user with that email`, 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateForSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are a receiving this email because you have requested thee reset of a password. Pleasse make a PUT request too: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password reset token",
        message,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      console.err(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateForSave: false });

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  });

/**
 * @type    {IRouteFunc}
 * @access  Public
 * @route   PUT /api/v1/auth/resetpassword/:resetToken
 * @desc    Reset Password
 */
exports.resetPassword = ({ userRepo }) =>
  asyncHandler(async (req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await userRepo.getUserByResetToken(resetPasswordToken);

    if (!user) {
      return next(new ErrorResponse("Invalid token", 400));
    }

    // Set new password
    user.password = password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
  });

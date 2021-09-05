/// <reference path="./controllers.typedefs.js" />
const { ErrorResponse } = require("../utils");
const { asyncHandler } = require("../middleware");

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

    // Create token
    const token = user.getSignedJwtToken();

    return res.status(200).json({ success: true, token });
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

    // Create token
    const token = user.getSignedJwtToken();

    return res.status(200).json({ success: true, token });
  });

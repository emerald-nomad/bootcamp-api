/// <reference path="./controllers.typedefs.js" />
const { ErrorResponse } = require("../utils");
const { asyncHandler } = require("../middleware");

/**
 * @type    {IRouteFunc}
 * @access  Public
 * @route   GET /api/v1/auth/register
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

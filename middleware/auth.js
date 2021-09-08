const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const { ErrorResponse } = require("../utils");
const { getUserById } = require("../repositories").userRepo;

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  const { authorization, cookie } = req.headers;
  let token;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split(" ")[1];
  }
  //   else if (cookie.token) {
  //     token = cookie.token;
  //   }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  try {
    // Verify token
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await getUserById(id);

    next();
  } catch {
    return next(new ErrorResponse("Not authorized", 401));
  }
});

// Grant access to specific roles
/** @param {string[]} roles */
exports.authorize = (...roles) => {
  /** @type {IRouteFuncCallback} */
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User with role '${req.user.role}' is not authorized to access this resource`,
          403
        )
      );
    }

    next();
  };
};

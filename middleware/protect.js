const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const { ErrorResponse } = require("../utils");
const { getUserById } = require("../repositories").userRepo;

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
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

    req.userId = await getUserById(id);

    next();
  } catch {
    return next(new ErrorResponse("Not authorized", 401));
  }
});

module.exports = protect;

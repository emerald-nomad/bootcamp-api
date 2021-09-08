const errorHandler = require("./error");
const asyncHandler = require("./async");
const advancedResults = require("./advancedResults");
const auth = require("./auth");

module.exports = {
  errorHandler,
  asyncHandler,
  advancedResults,
  ...auth,
};

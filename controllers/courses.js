/// <reference path="./controllers.typedefs.js" />
const { ErrorResponse } = require("../utils");
const { asyncHandler } = require("../middleware");

/**
 * @type    {ICourseRouteFunc}
 * @access  Public
 * @route   GET /api/v1/courses
 * @route   GET /api/v1/bootcamp/:bootcampId/courses
 * @desc    Get courses
 */
exports.getCourses = (courseRepo) =>
  asyncHandler(async (req, res, next) => {
    const courses = await courseRepo.getCourses(req.params.bootcampId);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  });

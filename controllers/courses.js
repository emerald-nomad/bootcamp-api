/// <reference path="./controllers.typedefs.js" />
const { ErrorResponse } = require("../utils");
const { asyncHandler } = require("../middleware");

/**
 * @type    {ICourseRouteFunc}
 * @access  Public
 * @route   GET /api/v1/courses
 * @route   GET /api/v1/courses/:bootcampId/courses
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

/**
 * @type    {ICourseRouteFunc}
 * @access  Public
 * @route   GET /api/v1/courses/:id
 * @desc    Get a sinlgee course
 */
exports.getCourse = (courseRepo) =>
  asyncHandler(async (req, res, next) => {
    const course = await courseRepo.getCourse(req.params.id);
    console.log(course);
    if (!course) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.id}`)
      );
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  });

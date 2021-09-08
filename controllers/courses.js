/// <reference path="./controllers.typedefs.js" />
const { ErrorResponse } = require("../utils");
const { asyncHandler } = require("../middleware");

/**
 * @type    {IRouteFunc}
 * @access  Public
 * @route   GET /api/v1/courses
 * @route   GET /api/v1/courses/:bootcampId/courses
 * @desc    Get courses
 */
exports.getCourses = ({ courseRepo }) =>
  asyncHandler(async (req, res, next) => {
    const { bootcampId } = req.params;
    if (bootcampId) {
      const courses = await courseRepo.getCourses(req.params.bootcampId);

      return res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
      });
    } else {
      return res.status(200).json(res.advancedResults);
    }
  });

/**
 * @type    {IRouteFunc}
 * @access  Public
 * @route   GET /api/v1/courses/:id
 * @desc    Get a sinlgee course
 */
exports.getCourse = ({ courseRepo }) =>
  asyncHandler(async (req, res, next) => {
    const course = await courseRepo.getCourse(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  });

/**
 * @type    {IRouteFunc}
 * @access  Private
 * @route   POST /api/v1/bootcamps/:bootcampId/courses
 * @desc    Add a course
 */
exports.addCourse = ({ courseRepo, bootcampRepo }) =>
  asyncHandler(async (req, res, next) => {
    const { bootcampId } = req.params;
    req.body.user = req.user.id;

    req.body.bootcamp = bootcampId;

    const bootcamp = await bootcampRepo.getBootcamp(bootcampId);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`No bootcamp with the id of ${bootcampId}`, 404)
      );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "Admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this resource`,
          401
        )
      );
    }

    const course = await courseRepo.createCourse(req.body);

    res.status(200).json({
      success: true,
      data: course,
    });
  });

/**
 * @type    {IRouteFunc}
 * @access  Private
 * @route   PUT /api/v1/courses/:id
 * @desc    Update a course
 */
exports.updateCourse = ({ courseRepo }) =>
  asyncHandler(async (req, res, next) => {
    const course = await courseRepo.getCourse(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is bootcamp owner
    if (course.user.toString() !== req.user.id && req.user.role !== "Admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this resource`,
          401
        )
      );
    }

    const updatedCourse = await courseRepo.updateCourse({
      id: req.params.id,
      course: req.body,
    });

    res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  });

/**
 * @type    {IRouteFunc}
 * @access  Private
 * @route   DELETE /api/v1/courses/:id
 * @desc    Delete a course
 */
exports.deleteCourse = ({ courseRepo }) =>
  asyncHandler(async (req, res, next) => {
    const deletedCourse = await courseRepo.deleteCourse(req.params.id);

    if (!deletedCourse) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  });

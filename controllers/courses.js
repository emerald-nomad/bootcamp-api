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
    const courses = await courseRepo.getCourses(req.params.bootcampId);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
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

    req.body.bootcamp = bootcampId;

    const bootcampExists = await bootcampRepo.getBootcamp(bootcampId);

    if (!bootcampExists) {
      return next(
        new ErrorResponse(`No bootcamp with the id of ${bootcampId}`, 404)
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
exports.updateCourse = ({ courseRepo, bootcampRepo }) =>
  asyncHandler(async (req, res, next) => {
    const course = await courseRepo.getCourse(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
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

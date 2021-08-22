require("./controllers.typedefs");
const { ErrorResponse } = require("../utils");
const { asyncHandler } = require("../middleware");

/**
 * @type    {IBootcampRouteFunc}
 * @access  Public
 * @route   GET /api/v1/bootcamps
 * @desc    Get all bootcamps
 */
exports.getBootcamps = (bootcampRepo) =>
  asyncHandler(async (req, res, next) => {
    const bootcamps = await bootcampRepo.getBootcamps();

    res
      .status(200)
      .json({ succes: true, count: bootcamps.length, data: bootcamps });
  });

/**
 * @type    {IBootcampRouteFunc}
 * @access  Private
 * @route   POST /api/v1/bootcamps
 * @desc    Create new bootcamp
 */
exports.createBootcamp = (bootcampRepo) =>
  asyncHandler(async (req, res, next) => {
    const bootcamp = await bootcampRepo.createBootcamp(req.body);

    res.status(201).json({ succes: true, data: bootcamp });
  });

/**
 * @type    {IBootcampRouteFunc}
 * @access  Public
 * @route   GET /api/v1/bootcamps/:id
 * @desc    Get a single bootcamp
 */
exports.getBootcamp = (bootcampRepo) =>
  asyncHandler(async (req, res, next) => {
    const bootcamp = await bootcampRepo.getBootcamp(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(201).json({ succes: true, data: bootcamp });
  });

/**
 * @type    {IBootcampRouteFunc}
 * @access  Private
 * @route   PUT /api/v1/bootcamps/:id
 * @desc    Update a bootcamp
 */
exports.updateBootcamp = (bootcampRepo) =>
  asyncHandler(async (req, res, next) => {
    const updatedBootcamp = await bootcampRepo.updateBootcamp(
      req.params.id,
      req.body
    );

    if (!updatedBootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ succes: true, data: updatedBootcamp });
  });

/**
 * @type    {IBootcampRouteFunc}
 * @access  Private
 * @route   DELETE /api/v1/bootcamps/:id
 * @desc    Delete a bootcamp
 */
exports.deleteBootcamp = (bootcampRepo) =>
  asyncHandler(async (req, res, next) => {
    const deletedBootcamp = await bootcampRepo.deleteBootcamp(req.params.id);

    if (!deletedBootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ succes: true, data: {} });
  });

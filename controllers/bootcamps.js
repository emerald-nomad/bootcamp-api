require("./controllers.typedefs");
const { ErrorResponse, createGeocoder } = require("../utils");
const { asyncHandler } = require("../middleware");

/**
 * @type    {IBootcampRouteFunc}
 * @access  Public
 * @route   GET /api/v1/bootcamps
 * @desc    Get all bootcamps
 */
exports.getBootcamps = (bootcampRepo) =>
  asyncHandler(async (req, res, next) => {
    let query = {};

    let queryStr = JSON.stringify(req.query).replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    query = JSON.parse(queryStr);

    const bootcamps = await bootcampRepo.getBootcamps(query);

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
 * @access  Public
 * @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
 * @desc    Get bootcamps within a radius
 */
exports.getBootcampsInRadius = (bootcampRepo) =>
  asyncHandler(async (req, res, next) => {
    const geocoder = createGeocoder();

    const { zipcode, distance } = req.params;

    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth's radius = 3,963 miles or 6378 km
    const radius = distance / 3963;

    const bootcamps = await bootcampRepo.getBootcampsInRadius({
      lng,
      lat,
      radius,
    });

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
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

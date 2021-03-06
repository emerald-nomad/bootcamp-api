/// <reference path="./controllers.typedefs.js" />
const path = require("path");
const { ErrorResponse, createGeocoder } = require("../utils");
const { asyncHandler } = require("../middleware");

/**
 * @type    {IRouteFunc}
 * @access  Public
 * @route   GET /api/v1/bootcamps
 * @desc    Get all bootcamps
 */
exports.getBootcamps = () =>
  asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  });

/**
 * @type    {IRouteFunc}
 * @access  Private
 * @route   POST /api/v1/bootcamps
 * @desc    Create new bootcamp
 */
exports.createBootcamp = ({ bootcampRepo }) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    // Add user to req.body
    req.body.user = userId;

    // Check for published bootcamp by user
    const publishedBootcamp = await bootcampRepo.getBootcampByUserId(userId);
    if (publishedBootcamp && req.user.role !== "Admin") {
      return next(
        new ErrorResponse(
          `User with id ${userId} has already published a bootcamp`,
          400
        )
      );
    }

    const bootcamp = await bootcampRepo.createBootcamp(req.body);

    res.status(201).json({ succes: true, data: bootcamp });
  });

/**
 * @type    {IRouteFunc}
 * @access  Public
 * @route   GET /api/v1/bootcamps/:id
 * @desc    Get a single bootcamp
 */
exports.getBootcamp = ({ bootcampRepo }) =>
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
 * @type    {IRouteFunc}
 * @access  Public
 * @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
 * @desc    Get bootcamps within a radius
 */
exports.getBootcampsInRadius = ({ bootcampRepo }) =>
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
 * @type    {IRouteFunc}
 * @access  Private
 * @route   PUT /api/v1/bootcamps/:id
 * @desc    Update a bootcamp
 */
exports.updateBootcamp = ({ bootcampRepo }) =>
  asyncHandler(async (req, res, next) => {
    const bootcamp = await bootcampRepo.getBootcamp(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
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

    const updatedBootcamp = await bootcampRepo.updateBootcamp(
      req.params.id,
      req.body
    );

    res.status(200).json({ succes: true, data: updatedBootcamp });
  });

/**
 * @type    {IRouteFunc}
 * @access  Private
 * @route   DELETE /api/v1/bootcamps/:id
 * @desc    Delete a bootcamp
 */
exports.deleteBootcamp = ({ bootcampRepo }) =>
  asyncHandler(async (req, res, next) => {
    const bootcamp = await bootcampRepo.getBootcamp(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "Admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this resource`,
          401
        )
      );
    }

    await bootcampRepo.deleteBootcamp(req.params.id);

    res.status(200).json({ succes: true, data: {} });
  });

/**
 * @type    {IRouteFunc}
 * @access  Private
 * @route   PUT /api/v1/bootcamps/:id/photo
 * @desc    Upload photo for bootcamp
 */
exports.uploadBootcampPhoto = ({ bootcampRepo }) =>
  asyncHandler(async (req, res, next) => {
    const bootcamp = await bootcampRepo.getBootcamp(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
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

    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const { file } = req.files;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check file size
    if (file.size > process.env.MAX_FILIE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILIE_UPLOAD}`,
          400
        )
      );
    }

    // Create custom file name
    file.name = `photo_${bootcamp.id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);

        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      await bootcampRepo.updateBootcamp(req.params.id, { photo: file.name });

      res.status(200).json({ success: true, data: file.name });
    });
  });

require("./controllers.typedefs");

/**
 * @type    {Controller}
 * @access  Public
 * @route   GET /api/v1/bootcamps
 * @desc    Get all bootcamps
 */
exports.getBootCamps = (req, res, next) => {
  res.status(200).json({ succes: true, msg: `Show all bootcamps` });
};

/**
 * @type    {Controller}
 * @access  Private
 * @route   POST /api/v1/bootcamps
 * @desc    Create new bootcamp
 */
exports.createBootCamp = (req, res, next) => {
  res.status(200).json({ succes: true, msg: `Create new bootcamp` });
};

/**
 * @type    {Controller}
 * @access  Public
 * @route   GET /api/v1/bootcamps/:id
 * @desc    Get a single bootcamp
 */
exports.getBootCamp = (req, res, next) => {
  res.status(200).json({ succes: true, msg: `Show bootcamp ${req.params.id}` });
};

/**
 * @type    {Controller}
 * @access  Private
 * @route   PUT /api/v1/bootcamps/:id
 * @desc    Update a bootcamp
 */
exports.updateBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ succes: true, msg: `Update bootcamp ${req.params.id}` });
};

/**
 * @type    {Controller}
 * @access  Private
 * @route   DELETE /api/v1/bootcamps/:id
 * @desc    Delete a bootcamp
 */
exports.deleteBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ succes: true, msg: `Delete bootcamp ${req.params.id}` });
};

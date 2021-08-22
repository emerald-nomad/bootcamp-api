require("./controllers.typedefs");

/**
 * @type    {IBootcampRouteFunc}
 * @access  Public
 * @route   GET /api/v1/bootcamps
 * @desc    Get all bootcamps
 */
exports.getBootcamps = (bootcampRepo) => async (req, res, next) => {
  try {
    const bootcamps = await bootcampRepo.getBootcamps();

    res
      .status(200)
      .json({ succes: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

/**
 * @type    {IBootcampRouteFunc}
 * @access  Private
 * @route   POST /api/v1/bootcamps
 * @desc    Create new bootcamp
 */
exports.createBootcamp = (bootcampRepo) => async (req, res, next) => {
  try {
    const bootcamp = await bootcampRepo.createBootcamp(req.body);

    res.status(201).json({ succes: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

/**
 * @type    {IBootcampRouteFunc}
 * @access  Public
 * @route   GET /api/v1/bootcamps/:id
 * @desc    Get a single bootcamp
 */
exports.getBootcamp = (bootcampRepo) => async (req, res, next) => {
  try {
    const bootcamp = await bootcampRepo.getBootcamp(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(201).json({ succes: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

/**
 * @type    {IBootcampRouteFunc}
 * @access  Private
 * @route   PUT /api/v1/bootcamps/:id
 * @desc    Update a bootcamp
 */
exports.updateBootcamp = (bootcampRepo) => async (req, res, next) => {
  try {
    const updatedBootcamp = await bootcampRepo.updateBootcamp(
      req.params.id,
      req.body
    );

    if (!updatedBootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ succes: true, data: updatedBootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

/**
 * @type    {IBootcampRouteFunc}
 * @access  Private
 * @route   DELETE /api/v1/bootcamps/:id
 * @desc    Delete a bootcamp
 */
exports.deleteBootcamp = (bootcampRepo) => async (req, res, next) => {
  try {
    const deletedBootcamp = await bootcampRepo.deleteBootcamp(req.params.id);

    if (!deletedBootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ succes: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

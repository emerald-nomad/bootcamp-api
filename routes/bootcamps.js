const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers").bootcamps;
const repos = require("../repositories");

// INclude other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps(repos)).post(createBootcamp(repos));

router
  .route("/:id")
  .get(getBootcamp(repos))
  .put(updateBootcamp(repos))
  .delete(deleteBootcamp(repos));

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius(repos));

module.exports = router;

const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto,
} = require("../controllers").bootcamps;
const { advancedResults, protect } = require("../middleware");
const repos = require("../repositories");

const { bootcampRepo } = repos;

// INclude other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(
    advancedResults(
      bootcampRepo.getBootcamps,
      bootcampRepo.getNumberOfBootcamps
    ),
    getBootcamps(repos)
  )
  .post(protect, createBootcamp(repos));

router
  .route("/:id")
  .get(getBootcamp(repos))
  .put(protect, updateBootcamp(repos))
  .delete(protect, deleteBootcamp(repos));

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius(repos));

router.route("/:id/photo").put(protect, uploadBootcampPhoto(repos));

module.exports = router;

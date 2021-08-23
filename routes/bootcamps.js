const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers").bootcamps;
const { bootcampRepo } = require("../repositories");

const router = express.Router();

router
  .route("/")
  .get(getBootcamps(bootcampRepo))
  .post(createBootcamp(bootcampRepo));

router
  .route("/:id")
  .get(getBootcamp(bootcampRepo))
  .put(updateBootcamp(bootcampRepo))
  .delete(deleteBootcamp(bootcampRepo));

router
  .route("/radius/:zipcode/:distance")
  .get(getBootcampsInRadius(bootcampRepo));

module.exports = router;

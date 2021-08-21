const express = require("express");
const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
} = require("../controllers").bootcamps;
const { bootcampRepo } = require("../repositories");

const router = express.Router();

router
  .route("/")
  .get(getBootCamps(bootcampRepo))
  .post(createBootCamp(bootcampRepo));

router
  .route("/:id")
  .get(getBootCamp(bootcampRepo))
  .put(updateBootCamp(bootcampRepo))
  .delete(deleteBootCamp(bootcampRepo));

module.exports = router;

const express = require("express");
const repos = require("../repositories");
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } =
  require("../controllers").courses;

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses(repos)).post(addCourse(repos));

router
  .route("/:id")
  .get(getCourse(repos))
  .put(updateCourse(repos))
  .delete(deleteCourse(repos));

module.exports = router;

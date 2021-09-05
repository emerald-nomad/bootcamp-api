const express = require("express");
const repos = require("../repositories");
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } =
  require("../controllers").courses;
const { advancedResults, protect } = require("../middleware");

const { courseRepo } = repos;

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(courseRepo.getCourses, courseRepo.getNumberOfCourses),
    getCourses(repos)
  )
  .post(protect, addCourse(repos));

router
  .route("/:id")
  .get(getCourse(repos))
  .put(protect, updateCourse(repos))
  .delete(protect, deleteCourse(repos));

module.exports = router;

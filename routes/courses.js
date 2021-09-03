const express = require("express");
const repos = require("../repositories");
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } =
  require("../controllers").courses;
const { advancedResults } = require("../middleware");

const { courseRepo } = repos;

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(courseRepo.getCourses, courseRepo.getNumberOfCourses),
    getCourses(repos)
  )
  .post(addCourse(repos));

router
  .route("/:id")
  .get(getCourse(repos))
  .put(updateCourse(repos))
  .delete(deleteCourse(repos));

module.exports = router;

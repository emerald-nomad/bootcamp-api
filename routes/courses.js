const express = require("express");
const repos = require("../repositories");
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } =
  require("../controllers").courses;
const { advancedResults, protect, authorize } = require("../middleware");

const { courseRepo } = repos;

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(courseRepo.getCourses, courseRepo.getNumberOfCourses),
    getCourses(repos)
  )
  .post(protect, authorize("Publisher", "Admin"), addCourse(repos));

router
  .route("/:id")
  .get(getCourse(repos))
  .put(protect, authorize("Publisher", "Admin"), updateCourse(repos))
  .delete(protect, authorize("Publisher", "Admin"), deleteCourse(repos));

module.exports = router;

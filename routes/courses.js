const express = require("express");
const { courseRepo } = require("../repositories");
const { getCourses, getCourse } = require("../controllers").courses;

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses(courseRepo));

router.route("/:id").get(getCourse(courseRepo));

module.exports = router;

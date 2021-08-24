const express = require("express");
const { courseRepo } = require("../repositories");
const { getCourses } = require("../controllers").courses;

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses(courseRepo));

module.exports = router;

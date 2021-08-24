const express = require("express");
const repos = require("../repositories");
const { getCourses, getCourse } = require("../controllers").courses;

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses(repos));

router.route("/:id").get(getCourse(repos));

module.exports = router;

/// <reference path="./course.typedefs.js" />
const { Course } = require("../../models");

/** @type {ICourseRepository} */
const courseRepository = {
  getCourses: async (bootcampId) => {
    if (bootcampId) {
      return await Course.find({ bootcamp: bootcampId });
    } else {
      return await Course.find();
    }
  },
};

module.exports = courseRepository;

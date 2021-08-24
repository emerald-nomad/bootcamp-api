/// <reference path="./course.typedefs.js" />
const { Course } = require("../../models");

/** @type {ICourseRepository} */
const courseRepository = {
  getCourses: async (bootcampId) => {
    if (bootcampId) {
      return await Course.find({ bootcamp: bootcampId });
    } else {
      return await Course.find().populate({
        path: "bootcamp",
        select: "name description",
      });
    }
  },

  getCourse: async (id) => {
    return await Course.findById(id).populate({
      path: "bootcamp",
      select: "name description",
    });
  },
};

module.exports = courseRepository;

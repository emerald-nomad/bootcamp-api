/// <reference path="./course.typedefs.js" />
const { Course } = require("../../models");

/** @type {ICourseRepository} */
const courseRepository = {
  createCourse: async (course) => {
    return Course.create(course);
  },

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
    return Course.findById(id).populate({
      path: "bootcamp",
      select: "name description",
    });
  },
};

module.exports = courseRepository;

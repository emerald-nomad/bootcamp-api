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

  updateCourse: async ({ id, course }) => {
    const exists = await Course.findById(id);

    if (!exists) return null;

    return Course.findByIdAndUpdate(id, course, {
      new: true,
      runValidators: true,
    });
  },

  deleteCourse: async (id) => {
    const course = await Course.findById(id);

    if (!course) return false;

    course.remove();

    return true;
  },
};

module.exports = courseRepository;

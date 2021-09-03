/// <reference path="./course.typedefs.js" />
const { Course } = require("../../models");

/** @type {ICourseRepository} */
const courseRepository = {
  createCourse: async (course) => {
    return Course.create(course);
  },

  getNumberOfCourses: async () => {
    return await Course.countDocuments();
  },

  getCourses: async ({
    query,
    select,
    sort = "-createdAt",
    skip = 0,
    limit = 25,
  }) => {
    return await Course.find(query)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "bootcamp",
        select: "name description",
      });
  },

  getCoursesByBootcampId: async (bootcampId) => {
    return await Course.find({ bootcamp: bootcampId });
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

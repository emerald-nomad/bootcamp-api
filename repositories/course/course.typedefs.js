/// <reference path="../bootcamp/bootcamp.typedefs.js" />

/**
 * @typedef {Object} ICourseRepository
 * @property {IGetCourses} getCourses
 * @property {IGetCourse} getCourse
 */

/**
 * @callback IGetCourses
 * @param {string} [bootcampId=]
 * @returns {Promise<ICourse[]>}
 */

/**
 * @callback IGetCourse
 * @param {string} id
 * @returns {Promise<ICourse | null>}
 */

/**
 * @callback IAddCourse
 * @returns {Promise<ICourse>}
 */

/**
 * @typedef {Object} ICourse
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} weeks
 * @property {number} tuition
 * @property {('beginner' | 'intermediate' | 'advanced')} minimumSkill
 * @property {boolean} scholarshipAvailable
 * @property {Date} createdAt
 * @property {IBootcamp} bootcamp
 */

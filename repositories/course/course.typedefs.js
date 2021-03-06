/// <reference path="../bootcamp/bootcamp.typedefs.js" />

/**
 * @typedef {Object} ICourseRepository
 * @property {IGetCourses} getCourses
 * @property {IGetCoursesByBootcampId} getCoursesByBootcampId
 * @property {IGetCourse} getCourse
 * @property {ICreateCourse} createCourse
 * @property {IUpdateCourse} updateCourse
 * @property {IDeleteCourse} deleteCourse
 * @property {IGetNumberOfCourses} getNumberOfCourses
 */

/**
 * @callback IGetNumberOfCourses
 * @returns {number}
 */

/**
 * @typedef {Object} IGetCoursesParams
 * @property {object} [query={}]
 * @property {string} [select='']
 * @property {string} [sort='']
 * @property {number} [limit=100]
 * @property {number} [skip=0]
 */

/**
 * @callback IGetCourses
 * @param {IGetCoursesParams} params
 * @returns {Promise<ICourse[]>}
 */

/**
 * @callback IGetCoursesByBootcampId
 * @param {string} bootcampId
 * @returns {Promise<ICourse[]>}
 */

/**
 * @callback IGetCourse
 * @param {string} id
 * @returns {Promise<ICourse | null>}
 */

/**
 * @callback ICreateCourse
 * @param {ICourse} course
 * @returns {Promise<ICourse>}
 */

/**
 * @typedef {Object} IUpdateCourseParams
 * @property {string} id
 * @property {Partial<ICourse>} course
 */

/**
 * @callback IUpdateCourse
 * @param {IUpdateCourseParams} params
 * @return {Promise<ICourse | null>}
 */

/**
 * @callback IDeleteCourse
 * @param {string} id
 * @return {Promise<Boolean>}
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

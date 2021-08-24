/// <reference path="../repositories/course/course.typedefs.js" />
/// <reference path="../repositories/bootcamp/bootcamp.typedefs.js" />

/**
 * @callback IRouteFunc
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

/**
 * @callback IBootcampRouteFunc
 * @param {IBootcampRepository} bootcampRepo
 * @returns {IRouteFunc}
 */

/**
 * @callback ICourseRouteFunc
 * @param {ICourseRepository} courseRepo
 * @returns {IRouteFunc}
 */

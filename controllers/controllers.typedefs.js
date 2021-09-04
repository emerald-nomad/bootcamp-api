/// <reference path="../repositories/course/course.typedefs.js" />
/// <reference path="../repositories/bootcamp/bootcamp.typedefs.js" />
/// <reference path="../repositories/auth/auth.typedefs.js" />

/**
 * @typedef IRouteFuncParams
 * @property {ICourseRepository} courseRepo
 * @property {IBootcampRepository} bootcampRepo
 * @property {IAuthRepository} authRepo
 */

/**
 * @callback IRouteFunc
 * @param {IRouteFuncParams} params
 * @returns {IRouteFuncCallback}
 */

/**
 * @callback IRouteFuncCallback
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

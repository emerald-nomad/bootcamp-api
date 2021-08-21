/**
 * @callback RouteFunc
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

/**
 * @callback BootcampRouteFunc
 * @param {BootcampRepository} bootcampRepo
 * @returns {RouteFunc}
 */

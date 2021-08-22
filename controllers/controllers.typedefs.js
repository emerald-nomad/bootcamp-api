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

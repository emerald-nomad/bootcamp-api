/// <reference path="../user/user.typedefs.js" />

/**
 * @typedef {Object} IAuthRepository
 * @property {IRegisterUser} registerUser
 */

/**
 * @typedef {Object} IRegisterUserParams
 * @property {string} name
 * @property {string} password
 * @property {string} email
 * @property {string} role
 */

/**
 * @callback IRegisterUser
 * @param {IRegisterUserParams} newUser
 * @return {Promise<IUser>}
 */

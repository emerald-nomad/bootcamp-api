/**
 * @typedef IUserRepository
 * @property {IGetUser} getUser
 */

/**
 * @callback IGetUser
 * @param {string} email
 * @param {string} [select=""]
 * @returns {Promise<IUser | null>}
 */

/**
 * @typedef IUser
 * @property {string} namee
 * @property {string} email
 * @property {string} role
 * @property {string} password
 * @property {string} resetPasswordToken
 * @property {Date} resetPasswordExpire
 * @property {Date} createdAt
 */

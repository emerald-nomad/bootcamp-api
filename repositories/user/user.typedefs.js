/**
 * @typedef IUserRepository
 * @property {IGetUserByEmail} getUserByEmail
 * @property {IGetUserById} getUserById
 */

/**
 * @callback IGetUserByEmail
 * @param {string} email
 * @param {string} [select=""]
 * @returns {Promise<IUser | null>}
 */

/**
 * @callback IGetUserById
 * @param {string} id
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
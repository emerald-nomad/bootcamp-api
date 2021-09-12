/**
 * @typedef IUserRepository
 * @property {IGetUserByEmail} getUserByEmail
 * @property {IGetUserById} getUserById
 * @property {IGetUserByResetToken} getUserByResetToken
 * @property {IRegisterUser} registerUser
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
 * @callback IGetUserByResetToken
 * @param {string} resetToken
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

/**
 * @typedef {Object} IBootcampRepository
 * @property {IGetBootcamps} getBootcamps
 * @property {IGetBootcamp} getBootcamp
 * @property {ICreateBootcamp} createBootcamp
 * @property {IUpdateBootcamp} updateBootcamp
 * @property {IDeleteBootcamp} deleteBootcamp
 */

/**
 * @callback IGetBootcamps
 * @returns {Promise<IBootcamp[]>}
 */

/**
 * @callback IGetBootcamp
 * @param {string} id
 * @return {Promise<IBootcamp | null>}
 */

/**
 * @callback ICreateBootcamp
 * @param {IBootcamp} bootcamp
 * @return {Promise<IBootcamp>}
 */

/**
 * @callback IUpdateBootcamp
 * @param {string} id
 * @param {IBootcamp} bootcamp
 * @return {Promise<IBootcamp | null>}
 */

/**
 * @callback IDeleteBootcamp
 * @param {string} id
 * @return {Promise<IBootcamp>}
 */

/**
 * @typedef {Object} IBootcamp
 * @property {string} name
 * @property {string} slug
 * @property {string} description
 * @property {string} website
 * @property {string} phone
 * @property {string} email
 * @property {string} address
 * @property {IBootcampLocation} location
 * @property {string[]} careers
 * @property {number} aveerageRating
 * @property {number} averageCost
 * @property {string} photo
 * @property {boolean} housing
 * @property {boolean} jobAssistance
 * @property {boolean} jobGuarantee
 * @property {boolean} acceptGI
 * @property {date} createdAt
 * @property {User} user
 */

/**
 * @typedef {Object} IBootcampLocation
 * @property {string} type
 * @property {number[]} coordinates
 * @property {string} formattedAddress
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zipcode
 * @property {string} country
 */

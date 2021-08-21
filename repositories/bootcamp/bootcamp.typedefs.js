/**
 * @typedef {Object} BootcampRepository
 * @property {GetBootcamps} getBootcamps
 * @property {GetBootcamp} getBootcamp
 * @property {CreateBootcamp} createBootcamp
 * @property {UpdateBootcamp} updateBootcamp
 * @property {DeleteBootcamp} deleteBootcamp
 */

/**
 * @callback GetBootcamps
 * @returns {Promise<Bootcamp[]>}
 */

/**
 * @callback GetBootcamp
 * @param {string} id
 * @return {Promise<Bootcamp>}
 */

/**
 * @callback CreateBootcamp
 * @param {Bootcamp} bootcamp
 * @return {Promise<Bootcamp>}
 */

/**
 * @callback UpdateBootcamp
 * @param {Bootcamp} bootcamp
 * @return {Promise<Bootcamp>}
 */

/**
 * @callback DeleteBootcamp
 * @param {string} id
 * @return {Promise<Bootcamp>}
 */

/**
 * @typedef {Object} Bootcamp
 * @property {string} name
 * @property {string} slug
 * @property {string} description
 * @property {string} website
 * @property {string} phone
 * @property {string} email
 * @property {string} address
 * @property {BootcampLocation} location
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
 * @typedef {Object} BootcampLocation
 * @property {string} type
 * @property {number[]} coordinates
 * @property {string} formattedAddress
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zipcode
 * @property {string} country
 */

/**
 * Contains logic for making queries to the database for sealevel calculations
 **/
 
const db = require('../database.js');

/**
 * Adds a sea level multiplier in the database.
 * 
 * @param {integer} id unique user id
 * @param {float} multiplier number that the sea rises by each year
 * @param {integer} year current year
 */
addMultiplier = (id, multiplier, year) => {
    return db.pool.query({
        text: "INSERT INTO sealevel (id, multiplier, current_year) VALUES($1, $2, $3)",
        values: [id, multiplier, year]
    })
}


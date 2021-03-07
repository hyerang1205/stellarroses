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

/**
 * Retrieves the multiplier that the user stored for the year. 
 * 
 * @param {integer} id unique user id [default should be admin user's]
 * @param {integer} year current year
 */
getMultiplier = (id, year) =>{
    return db.pool.query({
        text: "SELECT * FROM sealevel WHERE id = $1 AND year = $2",
        values: [id, year]
    })
}

/**
 * Retrieves all entries of a user. 
 * 
 * @param {integer} id unique user id [default should be admin user's]
 */
getUserMultipliers = (id) =>{
    return db.pool.query({
        text: "SELECT * FROM sealevel WHERE id = $1 ",
        values: [id]
    })
}


/**
 * Deletes all of the multipliers saved by a user.
 * 
 * @param {integer} id unique user id
 */
deleteAll = (id) => {
    return db.pool.query({
        text: "DELETE FROM sealevel WHERE id = $1",
        values: [id]
    })
}

module.exports = {
    getMultiplier,
    addMultiplier,
    deleteAll,
    getUserMultipliers
}
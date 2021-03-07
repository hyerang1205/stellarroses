/**
 * Contains logic for making queries to the database for sealevel calculations
 **/
 
const db = require('../database.js');


/**
 * Adds a city to the database
 * 
 * @param {string} cityname
 */
addNewCity = (cityname) => {
    return db.pool.query({
        text: "INSERT INTO city_scores (city_name) VALUES($1)",
        values: [cityname]
    })
}

/**
 * Updates Score for a city.
 * 
 * @param {string} cityname name of a city
 * @param {integer} points points of the city
 */
updateScore = (cityname, points) => {
    return db.pool.query({
        text: "UPDATE city_scores SET points = $2 WHERE city_name=$1",
        values: [cityname, points]
    })
}

/**
 * Retrieves city's score from the database.
 * 
 * @param {string} cityname city name
 */
getScore = (cityname) => {
    return db.pool.query({
        text: "SELECT * from city_scores where city_name = $1",
        values: [cityname]
    })
}


module.exports = {
   getScore,
   addNewCity,
   updateScore
}
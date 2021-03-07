/**
 * Handles logic for retrieving and editing city scores.
 */

const cityModel = require('../model/cityModel');

/**
 * Creates new city.
 */
createCity = async (req, res) => {
    let city = req.params.city;
    cityModel.getScore(city).then((data) => {
        if (data.rowCount == 0) {
            cityModel.addNewCity(city).catch(err => res.status(500).json({
                message: "Error 500 Internal Server Error: " + err.message
            }))
            res.status(200).json('City added to the Database');
        } else {
            res.status(409).json('City already exists in the Database');
        }
    })
}

/**
 * Searches for city, if it doesn't exist, it creates it.
 */
searchCity = async (req, res) => {
    let city = req.params.city;
    cityModel.getScore(city).then((data) => {
        if (data.rowCount == 1) {
            res.status(200).json(data.rows);
        } else {
            res.status(404).json('City Not Found');
        }
    }).catch(e => res.status(500).json({
        message: 'Error 500 Internal Server Error: ' + e.message
    }));
}

/**
 * Update City Score
 */
updateCityScore = async (req, res) => {

    let city = req.params.city;
    let points = parseInt(req.body.points);
    cityModel.getScore(city).then((data) => {
        if (data.rowCount == 1) {
            let newPoints = parseInt(data.rows[0].points) + points;
            cityModel.updateScore(city, newPoints).then((data) => {
                res.status(200).json('Score Edited To ' + newPoints);
            })
        } else {
            res.status(404).json('City Not Found');
        }
    }).catch(e => res.status(500).json({
        message: 'Error 500 Internal Server Error: ' + e.message
    }));

}

getLeaderBoard = async (req, res) => {
    cityModel.getSortedScores().then((data) => {
        if (data.rowCount == 0) {
            res.status(404).json('Scores Not Found');
        } else {
            res.status(200).json(data.rows);
        }
    }).catch(err => res.status(500).json({
        message: "Internal Server Error: " + err.message
    }));
}

module.exports = {
    updateCityScore,
    searchCity,
    createCity,
    getLeaderBoard
}
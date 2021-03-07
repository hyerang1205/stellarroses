const seaModel = require('../model/seaLevelModel');

/**
 * Retreives all sealevels stored for a single user based on their id
 */
getUserLevels = async (req, res) => {
    let user_id = req.params.id;
    if (!user_id) {
        res.status(401).json('Unauthorized Request.');
    } else {
        seaModel.getUserMultipliers(user_id).then((data) => {
            console.log(data.rows);
            let sea_levels = [];
            for(i = 1; i < 101; i ++){
                sea_levels.push(97 + i* data.rows[0].multiplier);
            }
            res.status(200).json(sea_levels);
        }).catch(err => res.status(500).json({
            message: "Error 500 Internal Server Error: " + err.message
        }));
    }
}

module.exports = {
    getUserLevels
}
const imageModel = require('../model/imageModel');


createImage = async (req, res) => {
    let user_id = req.params.id;
    let image = req.body.image;
    imageModel.addImage(image, user_id).then((data) => {
        res.status(200).json('Image added to the Database');
    }).catch(e => res.status(500).json({
        message: 'Error 500 Internal Server Error: ' + e.message
    }));
}


getImages = async (req, res) => {
    let user_id = req.params.id;
    imageModel.getImages(user_id).then((data) => {
        if (data.rowCount == 0) {
            
            res.status(404).json('Image Not Found');
        } else {
            res.status(200).json(data.rows);
        }
    }).catch(e => res.status(500).json({
        message: 'Error 500 Internal Server Error: ' + e.message
    }));
}


module.exports = {
    createImage,
    getImages
}
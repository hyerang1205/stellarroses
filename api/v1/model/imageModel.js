const db = require('../database.js');


addImage = (image_text, user_id) => {
    return db.pool.query({
        text: "INSERT INTO user_images (image, id) VALUES($1, $2)",
        values: [image_text, user_id]
    })
}


getImages = (user_id) => {
    return db.pool.query({
        text: "SELECT * from user_images where id = $1",
        values: [user_id]
    })
}


module.exports = {
    addImage,
    getImages
}
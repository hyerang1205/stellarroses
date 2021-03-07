let db = require('../database');

function getPoints(id) {
    return db.pool.query("Select points from items where id ='" +id +"'");
}

function getItems(){
    return  db.pool.query(`Select * from items`); 
}

async function addItem(title, description, points) {
    return await db.pool.query(`INSERT INTO items(title, description, points) VALUES ('${title}', '${description}', '${points}')`);
}

module.exports = {
    getItems: getItems,
    getPoints: getPoints,
    addItem: addItem
}


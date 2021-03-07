let db = require('../database');

async function findUser(username,password) {
    return await db.pool.query(`Select * from users where username='${username}' and password='${password}'`);
}
function getUserId(username) {
    return db.pool.query("Select id from users where username ='" +username +"'");
}
function getLocation(username) {
    return db.pool.query("Select location from users where username ='" +username +"'");
}
function getPoints(username) {
    return db.pool.query("Select points from users where username ='" +username +"'");
}

async function registerUser(username, password, location) {
    return await db.pool.query(`INSERT INTO users(username, password, location) VALUES ('${username}', '${password}', '${location}')`);
}

//Internal use
function getUsers(){
    return  db.pool.query(`Select * from users`); 
}
function deleteUser(username){
    return  db.pool.query("Delete from users where username ='"+username +"'"); 
}

module.exports = {
    findUser: findUser,
    getUserId: getUserId,
    getLocation: getLocation,
    getPoints: getPoints,
    registerUser: registerUser,
    getUsers: getUsers,
    deleteUser: deleteUser
}


let db = require('../database');

async function findUser(username,password) {
    return await db.pool.query(`Select * from user_info where user_name='${username}' and password='${password}'`);
}
function getUserId(username) {
    return db.pool.query("Select user_id from user_info where user_name ='" +username +"'");
}
async function registerUser(username, password, location, points) {
    return await db.pool.query(`INSERT INTO user_info(id, username, password, location, points) VALUES (nextval('user_info_user_id_seq') '${username}', '${password}', '${location} || Vancouver', '${points} || 0')`);
}


module.exports = {
    findUser: findUser,
   getUserId: getUserId,
   registerUser: registerUser
}


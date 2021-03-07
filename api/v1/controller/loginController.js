let userModel = require('../model/loginModel');
let jwt = require('jsonwebtoken');
const secret = 'MYSECRETKEY';

async function authUser(req,res) {
    let body = req.body;
    userModel.findUser(body.username ,body.password)
        .then((users)=>{
            if(users.rowCount == 1) {
                res.status(200).json({token:
                    jwt.sign({
                        user_name: users.rows[0].user_name,
                        points: users.rows[0].points,
                        location: users.rows[0].location,
                        id : users.rows[0].id
                    },'MYSECRETKEY'),
                    username: users.rows[0].user_name,
                    points: users.rows[0].points,
                    location: users.rows[0].location,
                    id : users.rows[0].id
                });
                console.log("Log in!");
            } else {
                res.status(401).json({message: 'No such user'})
            }
    });
}

async function setPoints(req,res) {
    let body = req.body;
    userModel.getPoints(body.username ,body.password)
        .then((data)=>{
            console.log(data);
            if(data.rowCount == 1) {
                res.status(200).json(data[0]);
                console.log("Found!");
            } else {
                res.status(401).json({message: 'No such user'})
            }
    });
    userModel.setPoints(body.username ,body.points)
        .then((data)=>{
            res.status(200).json('Updated Entry in database.');
            console.log("Updated");
    });
}

async function register(req,res) {
    let body = req.body;
    try{
        //check if user exist
        userModel.getUserId(body.username)
        .then((result)=>{
            if(result.rowCount == 0) {
                console.log('No such user. Lets go');
                userModel.registerUser(body.username ,body.password, body.location)
                .then(() => {
                        console.log("User created: " + body.username);
                        res.status(200).json({token:
                            jwt.sign({
                                user_name: body.username,
                                points: body.points,
                                location: body.location
                            },'MYSECRETKEY'),
                            username: body.username,
                            points: body.points,
                            location: body.location
                    });                    
                })
            } else {
                res.status(401).json({message: 'Username already exists'});
            }
        });

    }
    catch(e){
        console.log(e);
    }
}

//internal use
async function getUsers(req,res) {
    userModel.getUsers()
        .then((users)=>{
            res.status(200).json(users);
        });
}

deleteUser= async (req,res) =>{
    let user;
    // if (req.headers && req.headers.authorization){
    //     user = await validateToken(req.headers.authorization);
    // }
    if (!user){
        res.status(402).json('Unauthorized user');
    } else {
        let body = req.body;
            console.log(body);
        userModel.deleteUser(body.username).then( (data) => {
            res.status(200).json('Deleted entry in database.');
        }).
        catch(e => res.status(500).json({message:e.message}));
    }
}


module.exports = {
    authUser: authUser,
    register: register,
    getUsers: getUsers,
    deleteUser: deleteUser,
    setPoints: setPoints
}
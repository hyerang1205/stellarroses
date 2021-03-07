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
                        user_name:users.rows[0].user_name,
                        password:users.rows[0].password,
                        location: users.rows[0].location
                    }, secret),
                    location: users.rows[0].location,
                    points: users.rows[0].points
                });
                console.log("Log in!");
            } else {
                res.status(401).json({message: 'No such user'})
            }
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
                                password: body.password,
                            },'MYSECRETKEY'),
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

deleteUserLocation = async (req,res) =>{
    let user;
    // if (req.headers && req.headers.authorization){
    //     user = await validateToken(req.headers.authorization);
    // }
    if (!user){
        res.status(402).json('Unauthorized user');
    } else {
        let body = req.body;
            console.log(body);
        let location_name = body.location_name;
        let user_id = body.user_id;
        let date = body.date;
        locationModel.deleteLocation(location_name, user_id, date).then( (data) => {
            res.status(200).json('Deleted entry in database.');
        }).
        catch(e => res.status(500).json({message:e.message}));
    }
}


module.exports = {
    authUser: authUser,
    register: register,
    getUsers: getUsers
}
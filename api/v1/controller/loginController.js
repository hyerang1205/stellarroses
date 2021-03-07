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

// async function getToken(req,res) {
//     let body = req.body;
//     userModel.findUser(body.username ,body.password)
//         .then((users)=>{
//             if(users.rowCount == 1) {
//                 res.status(200).json({token:
//                     jwt.sign({
//                         user_name:users.rows[0].username,
//                         password:users.rows[0].password
//                     },'MYSECRETKEY'),
//                     location: users.rows[0].location,
//                     points: users.rows[0].points
//                 });
//                 console.log("Log in!");
//             } else {
//                 res.status(401).json({message: 'No such user'})
//             }
//         });
// }

module.exports = {
    authUser: authUser,
    register: register,
    getUsers: getUsers
}
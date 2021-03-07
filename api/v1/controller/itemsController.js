let userModel = require('../model/loginModel');
let jwt = require('jsonwebtoken');
const itemsModel = require('../model/itemsModel');
const secret = 'MYSECRETKEY';

async function getPoints(req,res) {
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


async function addItem(req,res) {
    let body = req.body;
    try{
        itemsModel.addItem(body.title, body.description, body.points)
        .then(() => {
                console.log("Item created: " + body.title);
                res.status(200).json({title: body.title});                    
        })

    }
    catch(e){
        console.log(e);
    }
}

async function getItems(req,res) {
    itemsModel.getItems()
        .then((result)=>{
            res.status(200).json(result.rows);
        });
}


module.exports = {
    getItems: getItems,
    getPoints: getPoints,
    addItem: addItem
}
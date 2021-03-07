//Import all of the controller commands here for routing.
//the goal is to have it do api.get(/, fileimported)
const express = require("express");
const bodyParser = require('body-parser');
let cors = require('cors');
require('dotenv').config();
const api = express.Router();
let loginController = require('./controller/loginController');
const seaController = require('./controller/seaLevelController');

api.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
api.use(bodyParser.json())
api.use(cors());


//fix routing to stop displaying CANNOT GET /
api.get('/', (req, res) => res
    .send({
        message: 'Hello! You have reached the server for WaveNation by Stellar Roses!'
    }));

api.get('/sealevel/:id', seaController.getUserLevels);
api.post('/login', loginController.authUser);
api.post('/register', loginController.register);

module.exports = api;
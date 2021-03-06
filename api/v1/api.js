//Import all of the controller commands here for routing.
//the goal is to have it do api.get(/, fileimported)
const express = require("express");
const bodyParser = require('body-parser');
let cors = require('cors');
require('dotenv').config();
const api = express.Router();
const loginController = require('./controller/loginController');
const seaController = require('./controller/seaLevelController');
const itemsController = require('./controller/itemsController');
const cityController = require('./controller/cityController');
const imageController = require('./controller/imageController');

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
api.put('/addPoints', loginController.addPoints);
api.post('/register', loginController.register);
//Internal use
api.get('/users', loginController.getUsers);

api.get('/items', itemsController.getItems);
api.post('/addItem', itemsController.addItem);
// api.delete('/delte', loginController.delteUser);

api.get('/scores/:city', cityController.searchCity);

api.post('/scores/:city', cityController.createCity);

api.put('/scores/:city', cityController.updateCityScore);

api.post('/images/:id', imageController.createImage);

api.get('/images/:id', imageController.getImages);

api.get('/scores', cityController.getLeaderBoard);
module.exports = api;
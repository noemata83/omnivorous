const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Recipe = require('./api/models/recipe'),
    User = require('./api/models/user'),
    bodyParser = require('body-parser');
    
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Recipedb', {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const recipeRoutes = require('./api/routes/recipeRoutes');
recipeRoutes(app);

const authController = require('./api/controllers/authController');
app.use('/auth', authController);

app.listen(8081, process.env.IP, function() {
    console.log("Recipe restful API started on: " + 8081);
});


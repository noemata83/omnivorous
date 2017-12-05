const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Recipe = require('./api/models/recipe'),
    bodyParser = require('body-parser');
    
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Recipedb', {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/recipeRoutes');
routes(app);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Recipe restful API started on: " + process.env.PORT);
});

